# 第十三章：安全与隐私保护

## 13.1 端侧模型加密

端侧模型加密是保护模型知识产权、防止模型被逆向和窃取的关键技术。通过加密，即使攻击者获取了模型文件，也无法直接读取模型结构和参数，从而保护模型的所有权。

### 13.1.1 模型加密原理

模型加密的核心思想是使用加密算法对模型文件进行加密，只有在设备上解密后才能加载和使用。加密和解密过程通常由操作系统或硬件安全模块（如 Secure Enclave、TEE）管理，确保密钥的安全。

**加密流程**

```
原始模型
    ↓
加密（使用加密密钥）
    ↓
加密模型
    ↓
部署到设备
    ↓
设备端解密（使用设备密钥）
    ↓
内存中的解密模型
    ↓
推理使用
```

**加密算法**

**对称加密**
- 使用相同的密钥进行加密和解密
- 加密速度快，适合大文件加密
- 常见算法：AES-256、AES-128

**非对称加密**
- 使用公钥加密、私钥解密
- 密钥管理更安全，但加密速度较慢
- 常见算法：RSA、ECC

**混合加密**
- 使用对称加密加密模型文件
- 使用非对称加密加密对称密钥
- 兼顾加密速度和密钥管理安全性

**案例：AES-256 加密模型**

```python
from cryptography.fernet import Fernet

def encrypt_model(model_path, key, output_path):
    """
    使用 AES 加密模型文件
    key: 32 字节的加密密钥
    """
    # 读取模型文件
    with open(model_path, 'rb') as f:
        model_data = f.read()
    
    # 加密模型数据
    fernet = Fernet(key)
    encrypted_data = fernet.encrypt(model_data)
    
    # 写入加密模型文件
    with open(output_path, 'wb') as f:
        f.write(encrypted_data)

def decrypt_model(encrypted_path, key, output_path):
    """
    解密模型文件
    key: 32 字节的解密密钥
    """
    # 读取加密模型文件
    with open(encrypted_path, 'rb') as f:
        encrypted_data = f.read()
    
    # 解密模型数据
    fernet = Fernet(key)
    decrypted_data = fernet.decrypt(encrypted_data)
    
    # 写入解密后的模型文件
    with open(output_path, 'wb') as f:
        f.write(decrypted_data)

# 示例
key = Fernet.generate_key()  # 生成加密密钥
encrypt_model('model.pt', key, 'model_encrypted.pt')
decrypt_model('model_encrypted.pt', key, 'model_decrypted.pt')
```

### 13.1.2 Apple CoreML 模型加密

Apple 提供了内置的模型加密机制，通过 CoreML Tools 可以轻松加密模型文件。加密后的模型文件只能在 iOS 设备上解密和使用，无法在非 Apple 设备上解密。

**CoreML 模型加密原理**

CoreML 模型加密使用 Apple 的 Secure Enclave（安全隔区）和 Data Protection API（数据保护 API），确保模型文件在存储时加密，在内存中解密时受到保护。

**加密流程**

1. 使用 CoreML Tools 加密模型文件
2. 加密后的模型文件只能在 iOS 设备上解密
3. iOS 设备使用设备密钥解密模型文件
4. 解密后的模型在内存中运行，无法被导出

**加密步骤**

```python
import coremltools as ct

def encrypt_coreml_model(model_path, key_path, output_path):
    """
    加密 CoreML 模型
    model_path: 原始模型文件路径
    key_path: 加密密钥文件路径（可选，如果不提供则自动生成）
    output_path: 加密模型输出路径
    """
    # 读取原始模型
    model = ct.models.MLModel(model_path)
    
    # 加密模型
    if key_path:
        # 使用指定密钥加密
        encrypted_model = ct.utils.encrypt_model(model, key=key_path)
    else:
        # 自动生成密钥并加密
        encrypted_model = ct.utils.encrypt_model(model)
    
    # 保存加密模型和密钥
    encrypted_model.save(output_path)
    
    # 如果是自动生成的密钥，需要保存密钥文件
    if not key_path:
        key_path = output_path + '.key'
        encrypted_model.save_key(key_path)
        print(f"密钥已保存到: {key_path}")
    
    print(f"加密模型已保存到: {output_path}")

# 示例
encrypt_coreml_model('model.mlmodel', 'encryption.key', 'model_encrypted.mlmodel')
```

**模型部署**

加密后的 CoreML 模型可以直接部署到 iOS 设备上，无需额外的解密代码。iOS 系统会自动解密模型文件并加载到内存中。

```swift
import CoreML

class ModelManager {
    static func loadEncryptedModel() -> MyModel? {
        // 加载加密模型
        guard let modelURL = Bundle.main.url(forResource: "model_encrypted", withExtension: "mlmodelc") else {
            print("模型文件未找到")
            return nil
        }
        
        do {
            let model = try MyModel(contentsOf: modelURL)
            print("模型加载成功")
            return model
        } catch {
            print("模型加载失败: \(error)")
            return nil
        }
    }
}
```

**密钥管理**

CoreML 模型加密的密钥由 iOS 系统管理，使用 Data Protection API 保护密钥。密钥存储在 Keychain（钥匙串）中，即使设备被越狱，攻击者也无法直接读取密钥。

**案例：医疗应用模型加密**

某医疗应用使用 CoreML 模型加密保护医疗诊断模型：
- **模型**：7B 参数的医疗诊断模型
- **加密算法**：AES-256
- **密钥管理**：iOS Keychain
- **安全级别**：Complete Protection（设备锁定时无法访问）
- **效果**：模型文件无法被导出，密钥无法被读取，即使设备被越狱也无法窃取模型

### 13.1.3 Android 模型保护方案

Android 平台提供了多种模型保护方案，包括模型混淆、模型加密、密钥管理等。由于 Android 设备的碎片化，模型保护需要考虑不同厂商的安全机制。

**模型混淆**

模型混淆通过打乱模型结构、重命名张量、混淆算子名称等方式，使模型文件难以被逆向工程分析。

```python
import numpy as np

def obfuscate_model_weights(model, obfuscation_key):
    """
    混淆模型权重
    model: 模型对象
    obfuscation_key: 混淆密钥（numpy 数组）
    """
    # 遍历模型的所有权重
    for name, param in model.named_parameters():
        if 'weight' in name:
            # 使用混淆密钥打乱权重
            obfuscated_weight = param.data * obfuscation_key
            param.data = obfuscated_weight
    return model

def deobfuscate_model_weights(model, obfuscation_key):
    """
    解混淆模型权重
    model: 模型对象
    obfuscation_key: 混淆密钥（numpy 数组）
    """
    # 遍历模型的所有权重
    for name, param in model.named_parameters():
        if 'weight' in name:
            # 使用混淆密钥恢复权重
            deobfuscated_weight = param.data / obfuscation_key
            param.data = deobfuscated_weight
    return model

# 示例
obfuscation_key = np.random.randn(1, 1, 1, 1)  # 生成混淆密钥
obfuscated_model = obfuscate_model_weights(model, obfuscation_key)
deobfuscated_model = deobfuscate_model_weights(obfuscated_model, obfuscation_key)
```

**模型加密**

Android 平台可以使用 Java Cryptography Architecture (JCA) 加密模型文件，密钥存储在 Android Keystore 中。

```kotlin
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.IvParameterSpec
import java.io.File
import java.security.SecureRandom

fun encryptModel(modelFile: File, key: SecretKey): File {
    val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
    
    // 生成初始化向量（IV）
    val iv = ByteArray(16)
    SecureRandom().nextBytes(iv)
    val ivSpec = IvParameterSpec(iv)
    
    cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec)
    
    // 读取模型文件
    val modelData = modelFile.readBytes()
    
    // 加密模型数据
    val encryptedData = cipher.doFinal(modelData)
    
    // 写入加密文件（IV + 加密数据）
    val encryptedFile = File(modelFile.parent, "${modelFile.nameWithoutExtension}_encrypted.bin")
    encryptedFile.writeBytes(iv + encryptedData)
    
    return encryptedFile
}

fun decryptModel(encryptedFile: File, key: SecretKey): File {
    val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
    
    // 读取加密文件
    val encryptedData = encryptedFile.readBytes()
    
    // 提取 IV（前 16 字节）
    val iv = encryptedData.sliceArray(0..15)
    val ivSpec = IvParameterSpec(iv)
    
    // 提取加密数据（后 N 字节）
    val cipherText = encryptedData.sliceArray(16 until encryptedData.size)
    
    cipher.init(Cipher.DECRYPT_MODE, key, ivSpec)
    
    // 解密模型数据
    val decryptedData = cipher.doFinal(cipherText)
    
    // 写入解密后的模型文件
    val decryptedFile = File(encryptedFile.parent, "model_decrypted.bin")
    decryptedFile.writeBytes(decryptedData)
    
    return decryptedFile
}

// 示例
val keyGenerator = KeyGenerator.getInstance("AES")
keyGenerator.init(256)
val key = keyGenerator.generateKey()

val encryptedFile = encryptModel(File("model.bin"), key)
val decryptedFile = decryptModel(encryptedFile, key)
```

**Android Keystore 密钥管理**

Android Keystore 提供了安全的密钥存储机制，密钥存储在硬件安全模块（如 TrustZone）中，无法被导出。

```kotlin
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import java.security.KeyStore
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey

fun generateEncryptionKey(): SecretKey {
    val keyGenerator = KeyGenerator.getInstance(
        KeyProperties.KEY_ALGORITHM_AES,
        "AndroidKeyStore"
    )
    
    val keyGenSpec = KeyGenParameterSpec.Builder(
        "model_encryption_key",
        KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
    )
        .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
        .setUserAuthenticationRequired(false) // 不需要用户认证
        .build()
    
    keyGenerator.init(keyGenSpec)
    return keyGenerator.generateKey()
}

fun loadEncryptionKey(): SecretKey? {
    val keyStore = KeyStore.getInstance("AndroidKeyStore")
    keyStore.load(null)
    
    val key = keyStore.getKey("model_encryption_key", null) as? SecretKey
    return key
}

// 示例
val key = generateEncryptionKey()
val loadedKey = loadEncryptionKey()
```

**硬件安全模块（HSM）**

某些 Android 设备支持硬件安全模块（HSM），如 TrustZone、Secure Element。HSM 提供了更高级别的安全保护，密钥存储在硬件中，无法被软件读取。

```kotlin
import android.security.keystore.KeyGenParameterSpec

fun generateHsmKey(): SecretKey {
    val keyGenerator = KeyGenerator.getInstance(
        KeyProperties.KEY_ALGORITHM_AES,
        "AndroidKeyStore"
    )
    
    val keyGenSpec = KeyGenParameterSpec.Builder(
        "model_encryption_key_hsm",
        KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
    )
        .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
        .setUserAuthenticationRequired(false)
        .setIsStrongBoxBacked(true) // 使用 StrongBox（硬件安全模块）
        .build()
    
    keyGenerator.init(keyGenSpec)
    return keyGenerator.generateKey()
}
```

**案例：金融应用模型保护**

某金融应用使用多种技术保护模型：
- **模型混淆**：打乱模型结构，混淆算子名称
- **模型加密**：使用 AES-256 加密模型文件
- **密钥管理**：使用 Android Keystore 和 StrongBox
- **安全级别**：即使设备被 root，也无法窃取模型

### 13.1.4 加密密钥管理

加密密钥的管理是模型加密的关键环节，密钥泄露会导致模型加密失效。密钥管理需要考虑密钥生成、密钥存储、密钥轮换、密钥撤销等方面。

**密钥生成**

密钥生成应该使用密码学安全的随机数生成器（CSPRNG），避免使用弱密钥。

```python
import secrets

def generate_key(key_size=32):
    """
    生成加密密钥
    key_size: 密钥大小（字节），默认 32 字节（AES-256）
    """
    return secrets.token_bytes(key_size)

# 示例
key = generate_key(32)  # 生成 32 字节密钥（AES-256）
print(f"密钥: {key.hex()}")
```

**密钥存储**

密钥应该存储在安全的密钥管理系统中，如 Keychain、Keystore、AWS KMS、Azure Key Vault 等。避免将密钥硬编码在代码中或存储在普通文件中。

**密钥轮换**

密钥轮换是指定期更换加密密钥，减少密钥泄露的影响。密钥轮换需要考虑模型更新的时机和频率。

**密钥轮换策略**
- **定期轮换**：每 3-6 个月更换一次密钥
- **事件触发轮换**：密钥泄露、人员离职、系统升级等事件触发轮换
- **增量轮换**：逐步更换密钥，避免一次性更换所有模型

**密钥撤销**

密钥撤销是指撤销已泄露的密钥，防止攻击者使用泄露的密钥解密模型。密钥撤销需要考虑模型的重新加密和部署。

**案例：企业模型密钥管理**

某企业建立了完整的密钥管理体系：
- **密钥生成**：使用企业内部的密钥管理系统（KMS）
- **密钥存储**：使用 AWS KMS 存储密钥
- **密钥轮换**：每 6 个月轮换一次密钥
- **密钥撤销**：密钥泄露后 24 小时内完成撤销和重新加密
- **审计日志**：记录所有密钥操作，便于审计和追溯

---

## 13.2 数据隐私保护

数据隐私保护是端侧推理的天然优势，所有数据处理都在用户设备上完成，数据不出设备，天然满足 GDPR 等隐私法规的要求。

### 13.2.1 数据不出设备的优势

数据不出设备是指所有数据处理（如推理、训练、微调）都在用户设备上完成，不将数据上传到云端。

**优势**

**隐私保护**
- 用户数据从不出设备，隐私得到最大保护
- 无需考虑数据脱敏和加密
- 天然满足 GDPR、CCPA 等隐私法规

**数据安全**
- 数据存储在本地，避免云端数据泄露风险
- 无需担心云端数据库被攻击
- 减少数据传输过程中的安全风险

**合规优势**
- 更容易满足 GDPR 的"数据最小化"原则
- 更容易满足 CCPA 的"数据删除权"要求
- 减少跨境数据传输的法律风险

**用户体验**
- 无网络延迟，响应速度快
- 离线可用，始终可用
- 减少数据流量消耗

**案例：医疗诊断应用**

某医疗诊断应用采用端侧推理架构：
- **数据处理**：所有医疗数据（如 CT 图像、病历）都在设备上处理
- **隐私保护**：医疗数据不出设备，满足 HIPAA 等医疗隐私法规
- **合规优势**：无需申请医疗数据跨境传输许可
- **用户体验**：诊断结果在几秒内返回，无网络延迟

### 13.2.2 本地数据加密

即使数据不出设备，仍然需要对本地数据进行加密，防止设备被盗或被攻击时数据泄露。

**加密类型**

**全盘加密**
- 加密整个设备的存储空间
- 操作系统级别的加密
- iOS：FileVault（macOS）、Data Protection（iOS）
- Android：Full Disk Encryption（Android 6.0+）

**文件级加密**
- 加密特定文件或目录
- 应用级别的加密
- iOS：Data Protection API
- Android：EncryptedFile

**数据库加密**
- 加密数据库文件
- 使用 SQLCipher、Realm Encryption 等
- 适用于存储敏感数据的场景

**iOS Data Protection**

iOS Data Protection API 提供了不同级别的文件加密保护，根据设备锁定状态自动加密和解密文件。

```swift
import Foundation

class DataProtectionManager {
    static func saveProtectedData(data: Data, filename: String) {
        let fileManager = FileManager.default
        
        // 获取应用程序的 Documents 目录
        guard let documentsURL = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
            return
        }
        
        let fileURL = documentsURL.appendingPathComponent(filename)
        
        // 写入文件（Data Protection API 会自动加密文件）
        do {
            try data.write(to: fileURL, options: .completeFileProtection)
            print("数据已保存并加密")
        } catch {
            print("保存失败: \(error)")
        }
    }
    
    static func loadProtectedData(filename: Data) -> Data? {
        let fileManager = FileManager.default
        
        guard let documentsURL = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
            return nil
        }
        
        let fileURL = documentsURL.appendingPathComponent(String(data: filename, encoding: .utf8)!)
        
        // 读取文件（Data Protection API 会自动解密文件）
        do {
            let data = try Data(contentsOf: fileURL)
            print("数据已加载并解密")
            return data
        } catch {
            print("加载失败: \(error)")
            return nil
        }
    }
}

// 保护级别
enum FileProtectionType {
    case completeFileProtection          // 设备锁定时无法访问
    case completeFileProtectionUnlessOpen  // 文件打开时可以在设备锁定时访问
    case completeUntilFirstUserAuthentication // 用户首次解锁后可以访问
    case noProtection                     // 无保护
}
```

**Android EncryptedFile**

Android Jetpack Security 提供了 EncryptedFile API，可以方便地加密和解密文件。

```kotlin
import androidx.security.crypto.EncryptedFile
import androidx.security.crypto.MasterKey
import java.io.File

fun saveEncryptedData(context: Context, data: ByteArray, filename: String) {
    val masterKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()
    
    val encryptedFile = EncryptedFile.Builder(
        context,
        File(context.filesDir, filename),
        masterKey,
        EncryptedFile.FileEncryptionScheme.AES256_GCM_HKDF_4KB
    ).build()
    
    encryptedFile.openFileOutput().use { outputStream ->
        outputStream.write(data)
    }
    
    println("数据已保存并加密")
}

fun loadEncryptedData(context: Context, filename: String): ByteArray? {
    val masterKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()
    
    val encryptedFile = EncryptedFile.Builder(
        context,
        File(context.filesDir, filename),
        masterKey,
        EncryptedFile.FileEncryptionScheme.AES256_GCM_HKDF_4KB
    ).build()
    
    return try {
        encryptedFile.openFileInput().use { inputStream ->
            inputStream.readBytes()
        }
    } catch (e: Exception) {
        println("加载失败: $e")
        null
    }
}

// 示例
saveEncryptedData(context, "Hello, World!".toByteArray(), "secret.txt")
val data = loadEncryptedData(context, "secret.txt")
println(String(data ?: byteArrayOf()))
```

**案例：密码管理应用**

某密码管理应用使用本地数据加密：
- **加密策略**：使用 AES-256-GCM 加密密码文件
- **密钥管理**：使用 iOS Keychain / Android Keystore 存储加密密钥
- **保护级别**：iOS CompleteFileProtection，Android 设备锁定时无法访问
- **效果**：即使设备被盗，密码数据也无法被读取

### 13.2.3 敏感数据识别与处理

敏感数据识别与处理是指在数据处理前识别敏感信息（如姓名、电话、身份证号、信用卡号等），并对敏感数据进行脱敏或加密处理。

**敏感数据类型**

**个人身份信息（PII）**
- 姓名、身份证号、护照号、驾驶证号
- 电话号码、邮箱地址、家庭住址
- 银行卡号、信用卡号、社保号

**医疗信息**
- 病历、诊断结果、处方记录
- 医学图像（CT、MRI、X 光）
- 基因数据、生物识别数据

**财务信息**
- 收入、资产、负债信息
- 交易记录、投资记录
- 税务信息、保险信息

**敏感数据识别**

**正则表达式**
- 使用正则表达式匹配敏感数据模式
- 适用于结构化数据（如身份证号、银行卡号）

**命名实体识别（NER）**
- 使用 NLP 模型识别敏感实体
- 适用于非结构化数据（如文本、对话）

```python
import re

def detect_pii(text):
    """
    检测文本中的敏感信息（PII）
    """
    pii_patterns = {
        'phone': r'1[3-9]\d{9}',  # 中国手机号
        'id_card': r'\d{17}[\dXx]',  # 中国身份证号
        'email': r'\S+@\S+',  # 邮箱地址
        'credit_card': r'\d{4}-\d{4}-\d{4}-\d{4}',  # 信用卡号
    }
    
    detected_pii = {}
    
    for pii_type, pattern in pii_patterns.items():
        matches = re.findall(pattern, text)
        if matches:
            detected_pii[pii_type] = matches
    
    return detected_pii

# 示例
text = "我的电话是 13812345678，身份证号是 110101199001011234，邮箱是 example@email.com"
detected = detect_pii(text)
print(detected)
# 输出：{'phone': ['13812345678'], 'id_card': ['110101199001011234'], 'email': ['example@email.com']}
```

**命名实体识别（NER）**

```python
import spacy

def detect_pii_ner(text):
    """
    使用 NLP 模型检测文本中的敏感信息（PII）
    """
    nlp = spacy.load("zh_core_web_sm")  # 加载中文 NLP 模型
    doc = nlp(text)
    
    pii_entities = {
        'PERSON': [],      # 人名
        'ORG': [],         # 组织名
        'GPE': [],         # 地理位置
        'DATE': [],        # 日期
    }
    
    for ent in doc.ents:
        if ent.label_ in pii_entities:
            pii_entities[ent.label_].append(ent.text)
    
    return pii_entities

# 示例
text = "张三是北京市某公司的员工，出生于 1990 年 1 月 1 日"
detected = detect_pii_ner(text)
print(detected)
# 输出：{'PERSON': ['张三'], 'ORG': ['某公司'], 'GPE': ['北京市'], 'DATE': ['1990 年 1 月 1 日']}
```

**敏感数据脱敏**

**替换**
- 将敏感数据替换为占位符（如 `[PHONE]`、`[ID_CARD]`）
- 适用于不保留原始数据的场景

**哈希**
- 使用哈希函数对敏感数据进行哈希处理
- 适用于需要保留数据唯一性但不需要原始数据的场景

**加密**
- 使用加密算法对敏感数据进行加密
- 适用于需要保留数据但保护隐私的场景

```python
import hashlib
import re

def anonymize_text(text):
    """
    对文本中的敏感信息进行脱敏处理
    """
    # 替换敏感信息
    anonymized_text = re.sub(r'1[3-9]\d{9}', '[PHONE]', text)
    anonymized_text = re.sub(r'\d{17}[\dXx]', '[ID_CARD]', anonymized_text)
    anonymized_text = re.sub(r'\S+@\S+', '[EMAIL]', anonymized_text)
    
    return anonymized_text

def hash_sensitive_data(data, salt=''):
    """
    对敏感数据进行哈希处理
    """
    hasher = hashlib.sha256()
    hasher.update((data + salt).encode('utf-8'))
    return hasher.hexdigest()

# 示例
text = "我的电话是 13812345678，身份证号是 110101199001011234，邮箱是 example@email.com"
anonymized = anonymize_text(text)
print(anonymized)
# 输出：我的电话是 [PHONE]，身份证号是 [ID_CARD]，邮箱是 [EMAIL]

hashed_phone = hash_sensitive_data("13812345678")
print(f"哈希后的电话号码: {hashed_phone}")
```

### 13.2.4 隐私合规实践

隐私合规实践是指在数据处理过程中遵守 GDPR、CCPA 等隐私法规的要求，保护用户隐私权利。

**GDPR 核心要求**

**数据最小化**
- 只收集和处理必要的数据
- 避免过度收集用户数据

**目的限制**
- 数据只能用于声明目的
- 不能未经同意用于其他目的

**用户同意**
- 获取用户的明确同意
- 提供撤回同意的机制

**数据可移植权**
- 用户有权获取自己的数据
- 用户有权将数据转移到其他服务

**被遗忘权**
- 用户有权要求删除自己的数据
- 数据删除后无法恢复

**实践案例**

**隐私政策**
- 明确说明数据收集目的、使用方式、存储期限
- 提供清晰的隐私政策链接
- 定期更新隐私政策

**用户同意管理**
- 在首次使用时获取用户同意
- 提供撤回同意的选项
- 记录用户同意的时间和方式

```swift
import Foundation

class PrivacyConsentManager {
    static let consentKey = "privacy_consent_granted"
    
    static func requestConsent(completion: @escaping (Bool) -> Void) {
        // 检查用户是否已经同意
        if UserDefaults.standard.bool(forKey: consentKey) {
            completion(true)
            return
        }
        
        // 显示隐私政策对话框
        let alert = UIAlertController(
            title: "隐私政策",
            message: "本应用需要收集您的使用数据以改进服务。数据只在本地处理，不会上传到云端。您同意吗？",
            preferredStyle: .alert
        )
        
        alert.addAction(UIAlertAction(title: "同意", style: .default) { _ in
            // 记录用户同意
            UserDefaults.standard.set(true, forKey: self.consentKey)
            completion(true)
        })
        
        alert.addAction(UIAlertAction(title: "不同意", style: .cancel) { _ in
            completion(false)
        })
        
        // 显示对话框
        DispatchQueue.main.async {
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
               let rootViewController = windowScene.windows.first?.rootViewController {
                rootViewController.present(alert, animated: true)
            }
        }
    }
    
    static func withdrawConsent() {
        // 撤销用户同意
        UserDefaults.standard.set(false, forKey: consentKey)
        
        // 删除用户数据
        UserDataManager.deleteAllData()
    }
}
```

**数据删除**
- 提供删除用户数据的功能
- 确保数据删除后无法恢复
- 删除数据前需要用户确认

```swift
import Foundation

class UserDataManager {
    static func deleteAllData() {
        let fileManager = FileManager.default
        
        guard let documentsURL = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
            return
        }
        
        // 删除所有用户数据
        do {
            let files = try fileManager.contentsOfDirectory(at: documentsURL, includingPropertiesForKeys: nil)
            for file in files {
                try fileManager.removeItem(at: file)
            }
            print("所有用户数据已删除")
        } catch {
            print("删除失败: \(error)")
        }
    }
}
```

**案例：合规实践**

某应用建立了完整的隐私合规体系：
- **隐私政策**：清晰的隐私政策，明确说明数据处理方式
- **用户同意**：首次使用时获取用户同意，提供撤回同意的选项
- **数据最小化**：只收集必要的数据，数据在本地处理
- **数据删除**：提供删除用户数据的功能，数据删除后无法恢复
- **审计日志**：记录所有数据处理操作，便于审计和追溯

---

## 13.3 安全合规要求

安全合规要求是指遵守行业法规和标准，如 GDPR、CCPA、HIPAA 等，确保应用和数据的安全性和合规性。

### 13.3.1 GDPR 等法规要求

**GDPR（通用数据保护条例）**

GDPR 是欧盟的数据保护法规，适用于处理欧盟公民数据的所有组织。

**核心原则**

**合法性、公平性和透明性**
- 必须合法地处理数据
- 数据处理方式必须公平
- 必须向用户透明地说明数据处理方式

**目的限制**
- 数据只能用于声明目的
- 不能未经同意用于其他目的

**数据最小化**
- 只收集和处理必要的数据
- 避免过度收集用户数据

**准确性**
- 数据必须准确且保持更新
- 不准确的数据必须及时删除

**存储限制**
- 数据不能无限期存储
- 存储期限必须合理

**完整性和保密性**
- 必须采取适当的安全措施保护数据
- 防止数据泄露、丢失或损坏

**用户权利**

**知情权**
- 用户有权知道自己的数据被如何处理
- 必须提供清晰的隐私政策

**访问权**
- 用户有权访问自己的数据
- 必须提供数据副本

**更正权**
- 用户有权更正不准确的个人数据

**删除权（被遗忘权）**
- 用户有权要求删除自己的数据
- 数据删除后无法恢复

**限制处理权**
- 用户有权限制数据处理
- 在争议期间可以暂停数据处理

**可移植权**
- 用户有权将数据转移到其他服务
- 必须提供机器可读的数据副本

**反对权**
- 用户有权反对数据处理
- 特别是用于营销目的的数据处理

**实践案例**

**隐私政策**
- 清晰说明数据处理目的、使用方式、存储期限
- 提供隐私政策链接和下载
- 定期更新隐私政策

**用户同意管理**
- 获取用户的明确同意
- 提供撤回同意的选项
- 记录用户同意的时间和方式

**数据访问请求**
- 提供用户访问自己数据的功能
- 在 30 天内响应数据访问请求
- 提供机器可读的数据副本

**数据删除请求**
- 提供用户删除数据的功能
- 在 30 天内响应数据删除请求
- 确保数据删除后无法恢复

**CCPA（加州消费者隐私法）**

CCPA 是加州的隐私法规，适用于处理加州居民数据的组织。

**用户权利**

**知情权**
- 用户有权知道企业收集了哪些数据
- 用户有权知道数据如何被使用

**删除权**
- 用户有权要求删除自己的数据

**选择退出权**
- 用户有权选择退出数据销售
- 企业必须提供"请勿出售我的信息"链接

**平等对待权**
- 企业不得因用户行使隐私权而歧视用户

### 13.3.2 模型安全防护

模型安全防护是指保护模型免受攻击，如模型窃取、模型逆向工程、对抗攻击等。

**模型窃取防护**

**模型加密**
- 加密模型文件，防止模型被导出
- 使用硬件安全模块（HSM）保护密钥

**模型混淆**
- 混淆模型结构和算子名称
- 使模型难以被逆向工程分析

**模型水印**
- 在模型中嵌入水印
- 用于模型版权保护

**模型水印技术**

模型水印是一种在模型中嵌入隐形标识的技术，用于模型版权保护和追踪。

```python
import torch

def add_model_watermark(model, watermark):
    """
    在模型中添加水印
    model: 模型对象
    watermark: 水印数据（tensor）
    """
    # 选择模型的某一层作为水印载体
    target_layer = model.layer[0]
    
    # 将水印嵌入到模型的权重中
    with torch.no_grad():
        target_layer.weight += watermark * 0.001  # 微小的水印权重
    
    return model

def detect_model_watermark(model, watermark):
    """
    检测模型中是否存在水印
    model: 模型对象
    watermark: 预期的水印数据（tensor）
    """
    # 提取模型某一层的权重
    target_layer = model.layer[0]
    extracted_watermark = target_layer.weight[0, 0:watermark.size(0)]
    
    # 检测水印是否存在（计算相似度）
    similarity = torch.cosine_similarity(
        extracted_watermark.unsqueeze(0),
        watermark.unsqueeze(0)
    )
    
    return similarity.item() > 0.9  # 相似度阈值

# 示例
watermark = torch.randn(10, 10)  # 生成随机水印
watermarked_model = add_model_watermark(model, watermark)
is_watermarked = detect_model_watermark(watermarked_model, watermark)
print(f"模型中是否存在水印: {is_watermarked}")
```

**对抗攻击防护**

对抗攻击是指通过精心设计的输入样本欺骗模型，使模型输出错误的预测结果。

**对抗样本防御**

**对抗训练**
- 在训练数据中加入对抗样本
- 提高模型对对抗攻击的鲁棒性

**输入净化**
- 对输入数据进行净化处理
- 移除对抗性扰动

**模型集成**
- 使用多个模型进行集成预测
- 降低单个模型被攻击的风险

```python
import torch
import torch.nn.functional as F

def adversarial_training(model, data, target, epsilon=0.01, alpha=0.001, num_iter=10):
    """
    对抗训练
    model: 模型对象
    data: 输入数据
    target: 目标标签
    epsilon: 扰动大小
    alpha: 扰动步长
    num_iter: 迭代次数
    """
    # 创建对抗样本
    perturbed_data = data.clone().detach()
    perturbed_data.requires_grad = True
    
    for _ in range(num_iter):
        # 前向传播
        output = model(perturbed_data)
        loss = F.cross_entropy(output, target)
        
        # 反向传播
        model.zero_grad()
        loss.backward()
        
        # 计算扰动
        perturbation = alpha * perturbed_data.grad.sign()
        
        # 更新对抗样本
        perturbed_data = perturbed_data + perturbation
        
        # 限制扰动大小
        perturbed_data = torch.clamp(perturbed_data, data - epsilon, data + epsilon)
        perturbed_data = torch.clamp(perturbed_data, 0, 1)
    
    # 使用对抗样本训练模型
    output = model(perturbed_data)
    loss = F.cross_entropy(output, target)
    
    return loss

# 示例
for batch in dataloader:
    data, target = batch
    loss = adversarial_training(model, data, target)
    loss.backward()
    optimizer.step()
```

**案例：模型安全防护实践**

某应用建立了完整的模型安全防护体系：
- **模型加密**：使用 AES-256 加密模型文件
- **模型混淆**：混淆模型结构和算子名称
- **模型水印**：在模型中嵌入水印，用于版权保护
- **对抗训练**：在训练数据中加入对抗样本，提高鲁棒性
- **输入净化**：对输入数据进行净化处理，移除对抗性扰动

### 13.3.3 逆向工程防护

逆向工程防护是指防止攻击者通过分析应用或模型文件，提取模型参数、算法逻辑等敏感信息。

**代码混淆**

代码混淆是通过修改代码结构、重命名变量、插入垃圾代码等方式，使代码难以被理解和分析。

**iOS 代码混淆**

Xcode 提供了代码混淆功能，可以在编译时自动混淆代码。

```swift
// Swift 代码混淆示例
// 在 Xcode Build Settings 中开启 "Enable Obfuscation"

class DataManager {
    func processUserData(_ data: [String]) -> [String] {
        // 混淆后，变量名和方法名会被替换为无意义的名称
        var result: [String] = []
        for item in data {
            if !item.isEmpty {
                result.append(item.uppercased())
            }
        }
        return result
    }
}

// 混淆后可能变成：
class a {
    func b(_ c: [String]) -> [String] {
        var d: [String] = []
        for e in c {
            if !e.isEmpty {
                d.append(e.uppercased())
            }
        }
        return d
    }
}
```

**Android 代码混淆**

Android 提供了 R8/ProGuard 混淆工具，可以在编译时自动混淆代码。

```gradle
// build.gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

// proguard-rules.pro
-keep class com.example.model.Model { *; }
-keepclassmembers class com.example.model.Model {
    public *;
}
```

**二进制加固**

二进制加固是指对编译后的二进制文件进行加固处理，防止被逆向工程分析。

**iOS 二进制加固**

iOS 可以使用 MachO 加密、代码签名等技术加固二进制文件。

**Android 二进制加固**

Android 可以使用 Dex 加密、VMP（虚拟机保护）等技术加固二进制文件。

**案例：逆向工程防护实践**

某应用建立了完整的逆向工程防护体系：
- **代码混淆**：混淆代码结构和变量名
- **二进制加固**：加固编译后的二进制文件
- **反调试**：检测调试器，防止动态分析
- **反模拟器**：检测模拟器，防止在模拟器上分析
- **完整性校验**：校验应用完整性，防止篡改

### 13.3.4 安全审计与合规检查

安全审计与合规检查是指定期检查应用和数据的安全性和合规性，及时发现和修复安全问题。

**安全审计**

**日志记录**
- 记录所有关键操作（如数据访问、模型加载、用户登录）
- 记录安全事件（如登录失败、数据泄露尝试）
- 日志应该包含时间、用户、操作、结果等信息

**异常检测**
- 检测异常行为（如大量数据导出、频繁登录失败）
- 检测异常访问模式（如异常时间访问、异常地点访问）
- 使用机器学习模型进行异常检测

**安全评估**
- 定期进行安全评估（如渗透测试、漏洞扫描）
- 使用专业的安全评估工具（如 OWASP ZAP、Burp Suite）
- 修复发现的安全问题

**合规检查**

**隐私合规检查**
- 检查隐私政策是否完整和准确
- 检查用户同意是否有效
- 检查数据处理是否符合 GDPR、CCPA 等法规

**安全合规检查**
- 检查是否使用了安全的加密算法
- 检查密钥管理是否安全
- 检查是否有安全漏洞

**案例：安全审计与合规检查实践**

某应用建立了完整的安全审计与合规检查体系：
- **日志记录**：记录所有关键操作和安全事件
- **异常检测**：使用机器学习模型检测异常行为
- **安全评估**：每季度进行一次渗透测试和漏洞扫描
- **隐私合规检查**：每年进行一次隐私合规审计
- **安全培训**：定期对开发人员进行安全培训

---

## 小结

安全与隐私保护是端侧推理的核心优势，所有数据处理都在用户设备上完成，数据不出设备，天然满足 GDPR 等隐私法规的要求。本章介绍了端侧模型加密、数据隐私保护、安全合规要求的关键技术。端侧推理工程师需要建立完整的安全防护体系，包括模型加密、数据加密、敏感数据识别、隐私合规实践、模型安全防护、逆向工程防护、安全审计与合规检查等，确保应用和数据的安全性和合规性。

**本章关键要点**
- 端侧模型加密是保护模型知识产权的关键技术，包括模型加密原理、Apple CoreML 模型加密、Android 模型保护方案、加密密钥管理
- 数据隐私保护是端侧推理的天然优势，包括数据不出设备、本地数据加密、敏感数据识别与处理、隐私合规实践
- 安全合规要求包括 GDPR 等法规要求、模型安全防护、逆向工程防护、安全审计与合规检查

**参考文献**
- Apple Data Protection: https://developer.apple.com/documentation/security/data_protection
- Android Keystore: https://developer.android.com/training/articles/keystore
- GDPR 官方网站: https://gdpr.eu
- OWASP Mobile Security: https://owasp.org/www-project-mobile-security/

---

_文档版本：v1.0_
_最后更新：2026-03-13_
