import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  header?: JSX.Element;
}

const Page: React.FC<Props> = props => {
  return (
    <View>
      {props.header}

      <View style={styles.container}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: '16px',
  },
});

export default Page;
