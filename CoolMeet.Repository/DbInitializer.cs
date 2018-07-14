using System;
using System.Collections.Generic;
using CoolMeet.Models.Models;
using CoolMeet.Repository;
using Microsoft.EntityFrameworkCore;

namespace CoolMeet.Repository
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            RemoveData(context);

            var statusEnable = new Status
            {
                Description = "Dostępny"
            };
            var statusDisenable = new Status
            {
                Description = "Niedostępny"
            };
            var freeUser = new User()
            {
                Created = DateTime.Now,
                Email = "join@gmail.com",
                FirstName = "Jan",
                LastName = "Kowalski"
            };
            var testUser = new User()
            {
                Created = DateTime.Now,
                Email = "Test@gmail.com",
                FirstName = "Test",
                LastName = "test",
            };
            var testEvent = new Event()
            {
                Created = DateTime.Now,
                Name = "Wspaniałe spotkanie",
                Address = "Strzegomska 53",
                City = "Wroclaw",
                Country = "Polska",
                Description = "Testowe wydarzenie",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(2),
                StatusId = 1,
                Status = statusEnable
            };
            var eventUser = new EventUser()
            {
                Created = DateTime.Now,
                Event = testEvent,
                User = testUser,
                UserType = "Administrator"
            };
            testEvent.Users = new List<EventUser>{ eventUser};

            context.Add(statusEnable);
            context.Add(statusDisenable);
            context.Add(freeUser);
            context.Add(testEvent);
            context.SaveChanges();
        }

        private static void RemoveData(Context context)
        {
            context.Database.EnsureDeleted();
            context.Database.Migrate();
            context.SaveChanges();
        }
    }
}
