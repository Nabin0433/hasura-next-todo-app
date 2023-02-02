import '../styles/background.css'
import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
const API_URL = process.env.API_URL;

const link = new HttpLink({
  uri: API_URL,
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
});


const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          todos: {
            merge(_existing: any, incoming: any) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </RecoilRoot>
    </ApolloProvider>
  )
}
