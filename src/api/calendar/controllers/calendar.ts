/**
 * calendar controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::calendar.calendar", ({ strapi }) => ({
   async find(ctx) {
      const { data } = await super.find(ctx);
      const categoryList = data.map(({ attributes }) => attributes.category);
      const calendarData = await Promise.all(
         data.map(async ({ attributes }) => {
            const GOOGLE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars/";
            const CALENDAR_ID = attributes.calendatID;
            const PUBLIC_KEY = attributes.publicKey;
            const dataUrl = [GOOGLE_CALENDAR_URL, CALENDAR_ID, "/events?key=", PUBLIC_KEY].join("");

            const response = await fetch(dataUrl);
            if (!response.ok) return null;
            const data = await response.json();
            const { items } = data as any;
            // console.log(items[items.length - 1].attachments);

            // items.forEach((el) => console.log(el));

            return items.map((e) => ({
               id: e.id,
               title: e.summary,
               start: formatDate(e.start),
               end: formatDate(e.end),
               calendarId: attributes.category,
               description: e.description ? e.description : "",
               location: e.attachments ? e.attachments[0].fileUrl : "",
            }));
         }),
      ).then((results) => results.filter((result) => result !== null).flat());

      return { data: calendarData, category: categoryList };
   },
}));

type DateObject = { dateTime: string; timeZone: string } | { date: string };

function formatDate(date: DateObject) {
   if ("dateTime" in date) {
      const format = new Date(date.dateTime);
      //   console.log(format)
      const hours = format.getHours().toString().length === 1 ? `0${format.getHours()}` : format.getHours();
      const min = format.getMinutes().toString().length === 1 ? `0${format.getMinutes()}` : format.getMinutes();
      const formattedDate = `${format.getFullYear()}-${format.getMonth()}-${format.getDate()} ${hours}:${min}`;
      //   console.log(format.getFullYear())
      return formattedDate;
   } else {
      return date.date;
   }
}
