import "~/styles/globals.css";

import { Provider, Navbar } from "~/components";

export const metadata = {
  title: "PromptNext",
  description: "Discover & share AI prompts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
