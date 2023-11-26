import { NextRouter } from 'next/router';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    forward: jest.fn(), 
    ...router,
  };
}

 /*type MockRouterProps = {
    children: ReactNode;
   };
   jest.mock('next/router', () => ({
    useRouter: () => ({
     route: '/',
     pathname: '/',
     query: {
       urlSearchTerm: '',
       page: '1',
       limit: '6',
     },
     asPath: '/?urlSearchTerm=n&page=1&limit=6',
    }),
   }));
   
   const MockRouter: React.FC<MockRouterProps> = ({ children }) => {
    const router = useRouter();
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
   }*/
