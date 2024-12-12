/*import React, { useEffect, useState } from 'react';
import { BarcodeScanner, Barcode } from '@capacitor-mlkit/barcode-scanning';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAlert, IonList, IonItem } from '@ionic/react';

const HomePage: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    // Перевіряємо, чи підтримується сканер
    const checkSupport = async () => {
      const result = await BarcodeScanner.isSupported();
      setIsSupported(result.supported);
    };
    checkSupport();
  }, []);

  const scan = async () => {
    const granted = await requestPermissions();
    if (!granted) {
      setAlertVisible(true);
      return;
    }
    const { barcodes: scannedBarcodes } = await BarcodeScanner.scan();
    setBarcodes((prev) => [...prev, ...scannedBarcodes]);
  };

  const requestPermissions = async (): Promise<boolean> => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Barcode Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isSupported ? (
          <>
            <IonButton expand="block" onClick={scan}>
              Scan Barcode
            </IonButton>
            <IonList>
              {barcodes.map((barcode, index) => (
                <IonItem key={index}>
                  <p>{barcode.displayValue}</p>
                </IonItem>
              ))}
            </IonList>
          </>
        ) : (
          <p>Barcode scanning is not supported on this device.</p>
        )}
        <IonAlert
          isOpen={alertVisible}
          onDidDismiss={() => setAlertVisible(false)}
          header="Permission Denied"
          message="Please grant camera permission to use the barcode scanner."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;*/

//версія 2

/*import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonFab, IonFabButton, IonIcon, IonButton, IonCheckbox } from '@ionic/react';
import { BarcodeScanner, Barcode } from '@capacitor-mlkit/barcode-scanning';
import { Preferences } from '@capacitor/preferences';
import { heart, camera, trash } from 'ionicons/icons';

const HomePage: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);
  const [history, setHistory] = useState<Barcode[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    const checkSupport = async () => {
      const result = await BarcodeScanner.isSupported();
      setIsSupported(result.supported);
    };

    const loadHistory = async () => {
      const savedHistory = await Preferences.get({ key: 'scanHistory' });
      if (savedHistory.value) {
        setHistory(JSON.parse(savedHistory.value));
      }
    };

    checkSupport();
    loadHistory();
  }, []);

  const scan = async () => {
    const granted = await requestPermissions();
    if (!granted) {
      alert('Please grant camera permissions to scan barcodes.');
      return;
    }
    const { barcodes: scannedBarcodes } = await BarcodeScanner.scan();
    setBarcodes((prev) => [...prev, ...scannedBarcodes]);
    setHistory((prev) => {
      const updatedHistory = [...prev, ...scannedBarcodes];
      saveHistory(updatedHistory);
      return updatedHistory;
    });
  };

  const saveHistory = async (history: Barcode[]) => {
    await Preferences.set({ key: 'scanHistory', value: JSON.stringify(history) });
  };

  const clearHistory = async () => {
    await Preferences.remove({ key: 'scanHistory' });
    setHistory([]);
    setSelectedItems([]);
  };

  const deleteSelectedItems = async () => {
    const updatedHistory = history.filter((_, index) => !selectedItems.includes(index));
    setHistory(updatedHistory);
    setSelectedItems([]);
    await saveHistory(updatedHistory);
  };

  const toggleSelection = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const requestPermissions = async (): Promise<boolean> => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Barcode Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Scanned Barcodes</IonLabel>
          </IonItem>
          {barcodes.map((barcode, index) => (
            <IonItem key={index}>
              <IonLabel position="stacked">{barcode.format}</IonLabel>
              <IonInput type="text" value={barcode.rawValue} readonly />
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Scan History</IonLabel>
          </IonItem>
          {history.map((barcode, index) => (
            <IonItem key={index}>
              <IonCheckbox
                slot="start"
                checked={selectedItems.includes(index)}
                onIonChange={() => toggleSelection(index)}
              />
              <IonLabel position="stacked">{barcode.format}</IonLabel>
              <IonInput type="text" value={barcode.rawValue} readonly />
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={deleteSelectedItems} color="danger" expand="block" disabled={selectedItems.length === 0}>
          Delete Selected
          
        </IonButton>
        <IonButton onClick={clearHistory} color="medium" expand="block" disabled={history.length === 0}>
          Clear All History
  
        </IonButton >
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={scan} disabled={!isSupported}>
          <IonIcon size="large"icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;*/

import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonFab, IonFabButton, IonIcon, IonButton, IonCheckbox } from '@ionic/react';
import { BarcodeScanner, Barcode } from '@capacitor-mlkit/barcode-scanning';
import { Preferences } from '@capacitor/preferences';
import { heart, camera, trash } from 'ionicons/icons';
import { Clipboard } from '@capacitor/clipboard';

const HomePage: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);
  const [history, setHistory] = useState<Barcode[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    const checkSupport = async () => {
      const result = await BarcodeScanner.isSupported();
      setIsSupported(result.supported);
    };

    const loadHistory = async () => {
      const savedHistory = await Preferences.get({ key: 'scanHistory' });
      if (savedHistory.value) {
        setHistory(JSON.parse(savedHistory.value));
      }
    };

    checkSupport();
    loadHistory();
  }, []);

  const scan = async () => {
    const granted = await requestPermissions();
    if (!granted) {
      alert('Please grant camera permissions to scan barcodes.');
      return;
    }
    const { barcodes: scannedBarcodes } = await BarcodeScanner.scan();
    
    // Оновлення списку баркодів, щоб новий баркод йшов першим
    setBarcodes((prev) => [...scannedBarcodes, ...prev]); 

    // Оновлення історії, щоб новий баркод йшов першим
    setHistory((prev) => {
      const updatedHistory = [...scannedBarcodes, ...prev]; 
      saveHistory(updatedHistory);
      return updatedHistory;
    });
  };

  const saveHistory = async (history: Barcode[]) => {
    await Preferences.set({ key: 'scanHistory', value: JSON.stringify(history) });
  };

  const clearHistory = async () => {
    await Preferences.remove({ key: 'scanHistory' });
    setHistory([]);
    setSelectedItems([]);
  };

  const deleteSelectedItems = async () => {
    const updatedHistory = history.filter((_, index) => !selectedItems.includes(index));
    setHistory(updatedHistory);
    setSelectedItems([]);
    await saveHistory(updatedHistory);
  };

  const toggleSelection = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const requestPermissions = async (): Promise<boolean> => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  };

  // Функція для перевірки, чи є у тексті URL
  const isValidUrl = (str: string) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(str);
  };

  // Відправка даних через меседжери (без плагіна, через URL-схеми)
  const shareData = async (barcodeValue: string) => {
    const message = `I scanned a barcode: ${barcodeValue}`;
    
    // Відправка через WhatsApp (потрібно, щоб додаток був встановлений на пристрої)
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.open(url, '_system'); // Відкриває WhatsApp або інший меседжер, якщо він встановлений

    // Для інших меседжерів:
    // Телеграм: telegram://msg?text=I%20scanned%20a%20barcode%3A%20${encodeURIComponent(barcodeValue)}
  };

  // Відкриття посилання автоматично (лише якщо є валідне посилання)
  const openLink = (url: string) => {
    if (isValidUrl(url)) {
      window.open(url, '_system');
    } else {
      alert('This barcode does not contain a valid URL.');
    }
  };

  // Копіювання тексту в буфер обміну
  const copyText = async (text: string) => {
    await Clipboard.write({
      string: text,
    });
    alert('Text copied to clipboard!');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Barcode Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Scanned Barcodes</IonLabel>
          </IonItem>
          {barcodes.map((barcode, index) => (
            <IonItem key={index}>
              <IonLabel position="stacked">{barcode.format}</IonLabel>
              <IonInput type="text" value={barcode.rawValue} readonly />
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Scan History</IonLabel>
          </IonItem>
          {history.map((barcode, index) => (
            <IonItem key={index}>
              <IonCheckbox
                slot="start"
                checked={selectedItems.includes(index)}
                onIonChange={() => toggleSelection(index)}
              />
              <IonLabel position="stacked">{barcode.format}</IonLabel>
              <IonInput type="text" value={barcode.rawValue} readonly />
              <IonButton onClick={() => copyText(barcode.rawValue)} size="small">
                Copy
              </IonButton>

              {/* Відкриваємо посилання лише якщо це валідний URL */}
              {isValidUrl(barcode.rawValue) && (
                <IonButton onClick={() => openLink(barcode.rawValue)} size="small">
                  Open Link
                </IonButton>
              )}
              <IonButton onClick={() => shareData(barcode.rawValue)} size="small">
                Share
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={deleteSelectedItems} color="danger" expand="block" disabled={selectedItems.length === 0}>
          Delete Selected
        </IonButton>
        <IonButton onClick={clearHistory} color="medium" expand="block" disabled={history.length === 0}>
          Clear All History
        </IonButton>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={scan} disabled={!isSupported}>
            <IonIcon size="large" icon={camera} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
