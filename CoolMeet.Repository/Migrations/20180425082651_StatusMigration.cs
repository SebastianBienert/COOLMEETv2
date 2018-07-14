using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CoolMeet.Repository.Migrations
{
    public partial class StatusMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Events");

            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "Events",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Discription = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_StatusId",
                table: "Events",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Statuses_StatusId",
                table: "Events",
                column: "StatusId",
                principalTable: "Statuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Statuses_StatusId",
                table: "Events");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropIndex(
                name: "IX_Events_StatusId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Events");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Events",
                nullable: false,
                defaultValue: "");
        }
    }
}
