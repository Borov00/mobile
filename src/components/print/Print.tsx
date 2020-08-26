import React, { useState, useEffect, useCallback } from 'react';
import Header from '../shared/Header';
import { View, Modal, Text } from 'react-native';
import { ListItem, CheckBox, Badge, Overlay, Button, Tooltip } from 'react-native-elements';
import TcpSocket from 'react-native-tcp-socket';

const PRINTER_PORT = 9100;

interface Item {
  id: number,
  user: string,
  positionName: string,
  numberOfRequests: number,
  date: Date,
}

const list: Item[] = [
  {
    id: 1,
    user: 'Вероника Кудрявцева',
    positionName: 'XBSoftware',
    numberOfRequests: 2,
    date: new Date(),
  },
  {
    id: 2,
    user: 'Вероника Кудрявцева',
    positionName: 'XBSoftware',
    numberOfRequests: 2,
    date: new Date(),
  },
  {
    id: 3,
    user: 'Вероника Кудрявцева',
    positionName: 'XBSoftware',
    numberOfRequests: 2,
    date: new Date(),
  },
  {
    id: 4,
    user: 'Вероника Кудрявцева',
    positionName: 'XBSoftware',
    numberOfRequests: 2,
    date: new Date(),
  },
  {
    id: 5,
    user: 'Вероника Кудрявцева',
    positionName: 'XBSoftware',
    numberOfRequests: 2,
    date: new Date(),
  },
  {
    id: 6,
    user: 'Вероника Кудрявцева',
    positionName: 'XBSoftware',
    numberOfRequests: 2,
    date: new Date(),
  },
]

const Print: React.FC = () => {
  const [ checkedIds, setCheckedIds ] = useState<number[]>([]);

  const onCheckboxPress = useCallback((id: number) => {
    if (getIsChecked(id)) {
      setCheckedIds(checkedIds.filter((checkedId: number) => checkedId !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  }, [setCheckedIds, checkedIds]);

  const getIsChecked = useCallback((id: number) => checkedIds.includes(id), [checkedIds]);
  return (
    <View>
      <Header
        placement='left'
        centerComponent={{ text: 'Принт наклеек', style: { color: '#fff' } }}
        rightComponent={{ icon: 'print', color: '#fff' }}
      />
      <View>
        { list.map((item: Item, index: number) => (
          <ListItem
            key={index}
            title={item.user}
            subtitle={item.positionName}
            bottomDivider
            leftElement={<Badge value={item.numberOfRequests} status="primary" />}
            rightSubtitle={item.date.toLocaleDateString()}
            rightElement={
              <CheckBox
                onPress={() => onCheckboxPress(item.id)}
                checked={getIsChecked(item.id)}
              />
            }
          />
        ))}
      </View>
    </View>
  );
}

export default Print;