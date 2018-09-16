using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CoolMeet.Repository.Migrations
{
    public partial class allowGuards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AllowBrowsingEvents",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "AllowShowingProfile",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowBrowsingEvents",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AllowShowingProfile",
                table: "AspNetUsers");
        }
    }
}
