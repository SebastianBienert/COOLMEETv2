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

            var statusAvailable = new Status
            {
                Description = "Dostępny"
            };
            var statusUnavailable = new Status
            {
                Description = "Niedostępny"
            };
            var tags = new List<Tag>
            {
                new Tag
                {
                    Name = "Wroclaw"
                },
                new Tag
                {
                    Name = "Programowanie"
                },
                new Tag
                {
                    Name = "Polska"
                },
                new Tag
                {
                    Name = "WrocSharp"
                },
                new Tag
                {
                    Name = ".NET"
                },
                new Tag
                {
                    Name = "Spotkanie"
                }
            };
     
            var freeUser = new User()
            {
                Created = DateTime.Now,
                Email = "join@gmail.com",
                FirstName = "Jan",
                LastName = "Kowalski",
                AllowBrowsingEvents = true,
                AllowShowingProfile = true
            };
            var testUser = new User()
            {
                Created = DateTime.Now,
                Email = "Test@gmail.com",
                FirstName = "Test",
                LastName = "test",
                AllowBrowsingEvents = true,
                AllowShowingProfile = true
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
                Status = statusAvailable
            };
            var eventUser = new EventUser()
            {
                Created = DateTime.Now,
                Event = testEvent,
                User = testUser,
                UserType = "Administrator"
            };


            var tagEvents = new List<TagEvent>();
            foreach (var tag in tags)
            {
                tagEvents.Add(new TagEvent()
                {
                    Created = DateTime.Now,
                    Event = testEvent,
                    Tag = tag
                });
            }
            

            testEvent.Users = new List<EventUser>{ eventUser};
            testEvent.TagEvents = tagEvents;

            context.Add(statusAvailable);
            context.Add(statusUnavailable);
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
