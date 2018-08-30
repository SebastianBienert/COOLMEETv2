using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CoolMeet.Repository.Migrations
{
    public partial class removePK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_TagEvents_Id",
                table: "TagEvents");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "TagEvents");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "TagEvents",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_TagEvents_Id",
                table: "TagEvents",
                column: "Id");
        }
    }
}
