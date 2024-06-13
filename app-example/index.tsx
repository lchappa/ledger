import Head from 'expo-router/head';
import { Text } from 'react-native';

export default function App() {
  return (
    <>
      <Head>
        <meta property="expo:handoff" content="true" />
      </Head>
      <Text>Hello World</Text>
    </>
  );
}
