import { Provider } from '@/components/ui/provider';
import Navbar from '@/components/nav-bar/nav-bar';
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning={true}>
      <body>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
