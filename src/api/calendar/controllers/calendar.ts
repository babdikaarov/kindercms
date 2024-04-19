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

            return items.map((e) => ({
               id: e.id,
               title: e.summary,
               start: formatStartDate(e.start),
               end: formatEndDate(e.end),
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

function formatStartDate(date: DateObject) {
   if ("dateTime" in date) {
      const dateString = date.dateTime;
      return formatLongDate(dateString);
   } else {
      return date.date;
   }
}
function formatEndDate(date: DateObject) {
   if ("dateTime" in date) {
      const dateString = date.dateTime;
      return formatLongDate(dateString);
   } else {
      const arr = date.date.split("-");
      const day = (Number(arr.pop()) - 1).toString();
      arr.push(day);
      const format = arr.join("-");
      return format;
   }
}

function formatLongDate(dateString: string) {
   const [datePart, timePart] = dateString.split("T");
   const [year, month, day] = datePart.split("-");
   const [hour, minute] = timePart.split(":");
   console.log(year, month, day, hour, minute);

   const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")} ${hour}:${minute}`;
   return formattedDate;
}
