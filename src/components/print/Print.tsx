import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '../shared/Header';
import { View, Modal, Text, StyleSheet } from 'react-native';
import { ListItem, CheckBox, Badge, Overlay, Button, Tooltip, Input, Icon } from 'react-native-elements';
import TcpSocket from 'react-native-tcp-socket';
import { PrintService } from './services/PrintService';

const PRINTER_PORT = 9100;

export interface Item {
  id: number,
  user: string,
  position: {
    id: number,
    name: string,
    group: string,
  },
  company: string,
  numberOfOrders: number,
  date: string,
}

const list: Item[] = [
  {
    id: 1,
    user: 'Имя Фамилия',
    company: 'XBSoftware',
    position: {
       id: 911,
       name: 'Блинчики с вишней и сметаной',
       group: 'Выпечка',
   },
    numberOfOrders: 2,
    date: "2020-07-11",
  },
 {
    id: 2,
    user: 'Имя Фамилия',
    company: 'XBSoftware',
    position: {
       id: 911,
       name: 'Блинчики с вишней и сметаной',
       group: 'Выпечка',
   },
    numberOfOrders: 2,
    date: "2020-07-11",
  },
  {
    id: 3,
    user: 'Имя Фамилия',
    company: 'XBSoftware',
    position: {
       id: 911,
       name: 'Блинчики с вишней и сметаной',
       group: 'Выпечка',
   },
    numberOfOrders: 2,
    date: "2020-07-11",
  },
]

const Print: React.FC = () => {
  const [ checkedIds, setCheckedIds ] = useState<number[]>([]);
  const [ printIp, setPrintIp ] = useState<string>();
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
  const [ isPrinting, setIsPrinting ] = useState<boolean>(false);

  const checkedItemsForPrint = useMemo(() => 
    PrintService.getPrintItems(list.filter((item: Item) => checkedIds.includes(item.id))),
    [checkedIds],
  );
  
  const onPrint = useCallback(() => {
    setIsPrinting(true);

    console.log({
        port: PRINTER_PORT,
        host: printIp,
      })

    const clientTcp = TcpSocket.createConnection({
      port: PRINTER_PORT,
      host: printIp,
      tls: true,
    }, () => {
      clientTcp.write(checkedItemsForPrint);

      clientTcp.destroy();
    });
  }, [printIp])

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              style={styles.cancelIcon}
              name='cancel'
              type='material'
              onPress={() => setIsModalVisible(false)}
            />

            <Input
              placeholder="Введите IP-адрес"
              onChangeText={(value: string) => setPrintIp(value)}
            />

            <Button
              icon={{
                name: "print",
                size: 30,
                color: "white"
              }}
              loading={isPrinting}
              title="Принт"
              onPress={onPrint}
              disabled={!printIp}
            />
          </View>
        </View>
      </Modal>
  
      <Header
        placement='left'
        centerComponent={{ text: 'Принт наклеек', style: { color: '#fff' } }}
        rightComponent={{ icon: 'print', color: '#fff', onPress: () => setIsModalVisible(true) }}
      />
      <View>
        { list.map((item: Item, index: number) => (
          <ListItem
            key={index}
            title={item.user}
            subtitle={item.position.name}
            bottomDivider
            leftElement={<Badge value={item.numberOfOrders} status="primary" />}
            rightSubtitle={item.date}
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

const styles = StyleSheet.create({
  cancelIcon: {
    marginLeft: '80%',
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    position: "relative",
    width: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});


export default Print;