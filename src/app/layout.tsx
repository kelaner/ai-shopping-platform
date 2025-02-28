import 'src/global.css';

import {CopilotKit} from "@copilotkit/react-core";


// ----------------------------------------------------------------------
import type {Viewport} from 'next';
import {AuthProvider as AmplifyAuthProvider} from 'src/auth/context/amplify';
import {AuthProvider as Auth0AuthProvider} from 'src/auth/context/auth0';
import {AuthProvider as FirebaseAuthProvider} from 'src/auth/context/firebase';

import {AuthProvider as JwtAuthProvider} from 'src/auth/context/jwt';
import {AuthProvider as SupabaseAuthProvider} from 'src/auth/context/supabase';
import {MotionLazy} from 'src/components/animate/motion-lazy';
import {ProgressBar} from 'src/components/progress-bar';
import {defaultSettings, SettingsDrawer, SettingsProvider} from 'src/components/settings';
import {detectSettings} from 'src/components/settings/server';

import {Snackbar} from 'src/components/snackbar';

import {CONFIG} from 'src/config-global';
import {LocalizationProvider} from 'src/locales';
import {I18nProvider} from 'src/locales/i18n-provider';
import {detectLanguage} from 'src/locales/server';

import {CheckoutProvider} from 'src/sections/checkout/context';
import {getInitColorSchemeScript} from 'src/theme/color-scheme-script';
import {primary} from 'src/theme/core/palette';
import {ThemeProvider} from 'src/theme/theme-provider';
import "@copilotkit/react-ui/styles.css";
import "@copilotkit/react-textarea/styles.css";


// ----------------------------------------------------------------------

const AuthProvider =
  (CONFIG.auth.method === 'amplify' && AmplifyAuthProvider) ||
  (CONFIG.auth.method === 'firebase' && FirebaseAuthProvider) ||
  (CONFIG.auth.method === 'supabase' && SupabaseAuthProvider) ||
  (CONFIG.auth.method === 'auth0' && Auth0AuthProvider) ||
  JwtAuthProvider;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({children}: Props) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const settings = CONFIG.isStaticExport ? defaultSettings : await detectSettings();


  return (
    <html lang={lang ?? 'en'} suppressHydrationWarning>
    <body>


    {getInitColorSchemeScript}

    <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
      <LocalizationProvider>
        <AuthProvider>
          <SettingsProvider
            settings={settings}
            caches={CONFIG.isStaticExport ? 'localStorage' : 'cookie'}
          >
            <ThemeProvider>
              <MotionLazy>
                <CheckoutProvider>
                  <Snackbar/>
                  <ProgressBar/>
                  <SettingsDrawer/>
                  <CopilotKit runtimeUrl="/api/copilotkit">
                    {children}
                  </CopilotKit>
                </CheckoutProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </LocalizationProvider>
    </I18nProvider>


    </body>
    </html>
  );
}
