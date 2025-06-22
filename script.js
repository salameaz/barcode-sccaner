// Define translation strings
const translations = {
    en: {
        appTitle: "Barcode Scanner with Price",
        mainTitle: "Barcode Scanner",
        selectCamera: "Select Camera:",
        startScanning: "Start Scanning",
        stopScanning: "Stop Scanning",
        scannedCodes: "Scanned Codes",
        noCodesScanned: "No codes scanned yet.",
        clearList: "Clear List",
        downloadJson: "Download JSON",
        copyToClipboard: "Copy to Clipboard",
        confirm: "Confirm",
        cancel: "Cancel",
        enterPriceTitle: "Enter Price",
        scannedCodeLabel: "Scanned Code:",
        priceOptionalLabel: "Price (optional):",
        savePrice: "Save Price",
        skipPrice: "Skip Price",
        // Messages
        scanningStarted: "Scanning started.",
        scanningStopped: "Scanning stopped.",
        noCamerasFound: "No cameras found on this device.",
        errorGettingCameras: "Error getting cameras:",
        unableToStartScanning: "Unable to start scanning:",
        pleaseSelectCamera: "Please select a camera.",
        listAlreadyEmpty: "List is already empty.",
        listCleared: "List cleared.",
        noCodesToDownload: "No codes to download.",
        jsonDownloaded: "JSON downloaded.",
        codesCopied: "Codes copied to clipboard!",
        failedToCopy: "Failed to copy codes. Please try manually.",
        codeRemoved: "Code removed.",
        codeAlreadyScanned: "Code already scanned:",
        addedWithPrice: "Added: {code} with price ${price}",
        addedNoPrice: "Added: {code} (no price)",
        confirmClearList: "Are you sure you want to clear all scanned codes?",
        confirmRemoveItem: "Are you sure you want to remove \"{code}\"?",
        priceNA: "N/A",
        scannedPrefix: "Scanned:",
        pricePrefix: "Price:",
        currencySymbol: "",
        copiedEntryFormat: "Code: {code}, Price: {price}, Scanned: {timestamp}"
    },
    ar: {
        appTitle: "تطبيق قارئ الباركود مع السعر",
        mainTitle: "قارئ الباركود",
        selectCamera: "اختر الكاميرا:",
        startScanning: "بدء القراءة",
        stopScanning: "إيقاف القراءة",
        scannedCodes: "الرموز المقروءة",
        noCodesScanned: "لم يتم قراءت أي رمز بعد.",
        clearList: "مسح القائمة",
        downloadJson: "تنزيل JSON",
        copyToClipboard: "نسخ إلى الحافظة",
        confirm: "تأكيد",
        cancel: "إلغاء",
        enterPriceTitle: "أدخل السعر",
        scannedCodeLabel: "الرمز الممسوح:",
        priceOptionalLabel: "السعر (اختياري):",
        savePrice: "حفظ السعر",
        skipPrice: "تخطي السعر",
        // Messages
        scanningStarted: "بدأت القراءة.",
        scanningStopped: "تم إيقاف القراءة.",
        noCamerasFound: "لم يتم العثور على كاميرات في هذا الجهاز.",
        errorGettingCameras: "خطأ في الحصول على الكاميرات:",
        unableToStartScanning: "تعذر بدء القراءة:",
        pleaseSelectCamera: "الرجاء اختيار كاميرا.",
        listAlreadyEmpty: "القائمة فارغة بالفعل.",
        listCleared: "تم مسح القائمة.",
        noCodesToDownload: "لا توجد رموز لتنزيلها.",
        jsonDownloaded: "تم تنزيل JSON.",
        codesCopied: "تم نسخ الرموز إلى الحافظة!",
        failedToCopy: "فشل نسخ الرموز. يرجى المحاولة يدوياً.",
        codeRemoved: "تمت إزالة الرمز.",
        codeAlreadyScanned: "الرمز ممسوح بالفعل:",
        addedWithPrice: "تمت الإضافة: {code} بسعر {price}$",
        addedNoPrice: "تمت الإضافة: {code} (لا يوجد سعر)",
        confirmClearList: "هل أنت متأكد أنك تريد مسح جميع الرموز الممسوحة؟",
        confirmRemoveItem: "هل أنت متأكد أنك تريد إزالة \"{code}\"؟",
        priceNA: "غير متوفر",
        scannedPrefix: "مقروء:",
        pricePrefix: "السعر:",
        currencySymbol: "",
        copiedEntryFormat: "الرمز: {code}, السعر: {price}, ممسوح: {timestamp}"
    }
};

let currentLanguage = localStorage.getItem('appLanguage') || 'en'; // Default to English
const htmlElement = document.documentElement;
const languageSelector = document.getElementById('language-selector');


function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('appLanguage', lang);


    if (lang === 'ar') {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.lang = 'ar';
    } else {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.lang = 'en';
    }


    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[lang][key]);
            } else if (element.tagName === 'TITLE') {
                document.title = translations[lang][key];
            }
            else {
                element.textContent = translations[lang][key];
            }
        }
    });


    if (lang === 'ar') {
        priceInput.placeholder = "مثال: 19.99";
    } else {
        priceInput.placeholder = "e.g., 19.99";
    }


    renderScannedCodes();
}


const html5QrCode = new Html5Qrcode("reader");

let scannedCodes = [];
const localStorageKey = 'scannedBarcodes';
let currentScannedCode = null;

const cameraSelect = document.getElementById('camera-select');
const startScanButton = document.getElementById('start-scan-button');
const stopScanButton = document.getElementById('stop-scan-button');
const clearListButton = document.getElementById('clear-list-button');
const downloadJsonButton = document.getElementById('download-json-button');
const copyClipboardButton = document.getElementById('copy-clipboard-button');
const scannedCodesListDiv = document.getElementById('scanned-codes-list');
const noItemsMessage = document.getElementById('no-items-message');
const messageBox = document.getElementById('message-box');


const confirmationModal = document.getElementById('confirmation-modal');
const modalMessage = document.getElementById('modal-message');
const modalConfirmButton = document.getElementById('modal-confirm-button');
const modalCancelButton = document.getElementById('modal-cancel-button');


const priceInputModal = document.getElementById('price-input-modal');
const scannedCodeDisplay = document.getElementById('scanned-code-display');
const priceInput = document.getElementById('price-input');
const savePriceButton = document.getElementById('save-price-button');
const skipPriceButton = document.getElementById('skip-price-button');


function showMessageBox(messageKey, duration = 3000, params = {}) {
    console.log(`Message: ${messageKey}`, params);
    let message = translations[currentLanguage][messageKey] || messageKey;
    for (const key in params) {
        message = message.replace(`{${key}}`, params[key]);
    }
    messageBox.textContent = message;
    messageBox.classList.add('show');
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, duration);
}


function showModal(id, messageKey, onConfirm, params = {}) {
    const modal = document.getElementById(id);
    let message = translations[currentLanguage][messageKey] || messageKey;
    for (const key in params) {
        message = message.replace(`{${key}}`, params[key]);
    }
    modalMessage.textContent = message;
    modal.classList.add('show');


    modalConfirmButton.onclick = null;
    modalCancelButton.onclick = null;


    modalConfirmButton.onclick = () => {
        onConfirm();
        hideModal(id);
    };
    modalCancelButton.onclick = () => {
        hideModal(id);
    };
}


function hideModal(id) {
    document.getElementById(id).classList.remove('show');
}


function loadCodes() {
    const storedCodes = localStorage.getItem(localStorageKey);
    if (storedCodes) {

        scannedCodes = JSON.parse(storedCodes);
    }
    renderScannedCodes();
}


function saveCodes() {

    localStorage.setItem(localStorageKey, JSON.stringify(scannedCodes));
    renderScannedCodes();
}


function renderScannedCodes() {
    scannedCodesListDiv.innerHTML = '';
    if (scannedCodes.length === 0) {

        noItemsMessage.style.display = 'block';
        noItemsMessage.textContent = translations[currentLanguage].noCodesScanned;
        scannedCodesListDiv.appendChild(noItemsMessage);
    } else {

        noItemsMessage.style.display = 'none';
        scannedCodes.forEach((item, index) => {
            const listItem = document.createElement('div');
            listItem.className = 'list-item';
            const priceText = item.price ? ` (${translations[currentLanguage].currencySymbol}${parseFloat(item.price).toFixed(2)})` : '';
            const timestampText = item.timestamp ? ` - ${item.timestamp}` : '';

            listItem.innerHTML = `
                        <span>${item.code}${priceText}${timestampText}</span>
                        <button class="text-red-500 hover:text-red-700 ml-4" data-index="${index}">
                            <svg xmlns="http:
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    `;
            scannedCodesListDiv.appendChild(listItem);
        });
    }
}


const onScanSuccess = (decodedText, decodedResult) => {


    const exists = scannedCodes.some(item => item.code === decodedText);

    if (!exists) {
        currentScannedCode = decodedText;
        scannedCodeDisplay.textContent = decodedText;
        priceInput.value = '';
        priceInputModal.classList.add('show');

        html5QrCode.pause();
    } else {
        showMessageBox('codeAlreadyScanned', 3000, { code: decodedText });
    }
};


const onScanError = (errorMessage) => {

};



Html5Qrcode.getCameras().then(cameras => {
    if (cameras.length > 0) {

        cameras.forEach(camera => {
            const option = document.createElement('option');
            option.value = camera.id;
            option.textContent = camera.label;
            cameraSelect.appendChild(option);
        });
        startScanButton.disabled = false;
    } else {
        showMessageBox('noCamerasFound');
        startScanButton.disabled = true;
    }
}).catch(err => {
    showMessageBox('errorGettingCameras', 3000, { error: err.message });
    startScanButton.disabled = true;
});


startScanButton.addEventListener('click', () => {
    const selectedCameraId = cameraSelect.value;
    if (selectedCameraId) {

        html5QrCode.start(
            selectedCameraId,
            {
                fps: 10,
                qrbox: (width, height) => {
                    const minDimension = Math.min(width, height);
                    return { width: minDimension * 0.8, height: minDimension * 0.8 };
                },
                aspectRatio: 1.777778
            },
            onScanSuccess,
            onScanError
        ).then(() => {
            showMessageBox('scanningStarted');
            startScanButton.disabled = true;
            stopScanButton.disabled = false;
            cameraSelect.disabled = true;
        }).catch(err => {
            showMessageBox('unableToStartScanning', 3000, { error: err.message });
        });
    } else {
        showMessageBox('pleaseSelectCamera');
    }
});


stopScanButton.addEventListener('click', () => {
    html5QrCode.stop().then(() => {
        showMessageBox('scanningStopped');
        startScanButton.disabled = false;
        stopScanButton.disabled = true;
        cameraSelect.disabled = false;
    }).catch(err => {
        showMessageBox('errorStoppingScanning', 3000, { error: err.message });
    });
});


savePriceButton.addEventListener('click', () => {
    const price = priceInput.value.trim();
    if (currentScannedCode) {
        scannedCodes.push({
            code: currentScannedCode,
            price: price || null,
            timestamp: new Date().toLocaleString()
        });
        saveCodes();
        showMessageBox('addedWithPrice', 3000, { code: currentScannedCode, price: price || translations[currentLanguage].priceNA });
        hideModal('price-input-modal');
        html5QrCode.resume();
        currentScannedCode = null;
    }
});


skipPriceButton.addEventListener('click', () => {
    if (currentScannedCode) {
        scannedCodes.push({
            code: currentScannedCode,
            price: null,
            timestamp: new Date().toLocaleString()
        });
        saveCodes();
        showMessageBox('addedNoPrice', 3000, { code: currentScannedCode });
        hideModal('price-input-modal');
        html5QrCode.resume();
        currentScannedCode = null;
    }
});


clearListButton.addEventListener('click', () => {
    if (scannedCodes.length === 0) {
        showMessageBox('listAlreadyEmpty');
        return;
    }

    showModal('confirmation-modal', 'confirmClearList', () => {
        scannedCodes = [];
        saveCodes();
        showMessageBox('listCleared');
    });
});


downloadJsonButton.addEventListener('click', () => {
    if (scannedCodes.length === 0) {
        showMessageBox('noCodesToDownload');
        return;
    }

    const dataStr = JSON.stringify(scannedCodes, null, 2);

    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'scanned_barcodes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessageBox('jsonDownloaded');
});


copyClipboardButton.addEventListener('click', () => {
    if (scannedCodes.length === 0) {
        showMessageBox('noCodesToCopy');
        return;
    }

    const textToCopy = scannedCodes.map(item => {
        const pricePart = item.price ? `, Price: ${parseFloat(item.price).toFixed(2)}` : ', Price: N/A';
        const timestampPart = item.timestamp ? `, Scanned: ${item.timestamp}` : '';
        return `Code: ${item.code}${pricePart}${timestampPart}`;
    }).join('\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
        showMessageBox('codesCopied');
    }).catch(err => {
        showMessageBox('failedToCopy');
        console.error('Failed to copy text: ', err);
    });
});


scannedCodesListDiv.addEventListener('click', (event) => {

    if (event.target.closest('button')) {
        const button = event.target.closest('button');

        const index = parseInt(button.dataset.index);
        if (!isNaN(index)) {

            showModal('confirmation-modal', 'confirmRemoveItem', () => {
                scannedCodes.splice(index, 1);
                saveCodes();
                showMessageBox('codeRemoved');
            }, { code: scannedCodes[index].code });
        }
    }
});


languageSelector.addEventListener('change', (event) => {
    setLanguage(event.target.value);
});


languageSelector.value = currentLanguage;
setLanguage(currentLanguage);
loadCodes();
stopScanButton.disabled = true;