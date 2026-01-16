import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type BotStats = {
    id: number;
    servers: number;
    member_count: number;
    commands_run: number;
    created_at: Date;
};

async function getConnection() {
    return mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT || "3306"),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
}

export async function GET() {
    let connection;

    try {
        connection = await getConnection();

        const [rows] = await connection.execute<mysql.RowDataPacket[]>(
            "SELECT * FROM bot_stats ORDER BY created_at DESC LIMIT 1"
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "No stats found" },
                { status: 404 }
            );
        }

        const stats = rows[0] as BotStats;

        return NextResponse.json({
            servers: stats.servers,
            users: stats.member_count,
            commandsRun: stats.commands_run,
        });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
