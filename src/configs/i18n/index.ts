import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { env } from 'prisma/config';

const i18nConfig = () => {
  return I18nModule.forRootAsync({
    useFactory: () => ({
      fallbackLanguage: env('FALLBACK_LANGUAGE'),
      loaderOptions: {
        path: process.cwd() + '/src/i18n/',
        watch: true,
      },
    }),
    resolvers: [
      { use: QueryResolver, options: ['lang'] },
      AcceptLanguageResolver,
      new HeaderResolver(['x-lang']),
    ],
  });
};

export default i18nConfig;
