import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Wait for cookies to be retrieved
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value;
  const locale = language;
  const messages = await import(`../../messages/${locale}.json`);

  return {
    locale: language,
    messages: messages.default,
  };
});
