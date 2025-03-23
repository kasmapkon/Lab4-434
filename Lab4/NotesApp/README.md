# Ứng Dụng Ghi Chú với Firebase Firestore

Ứng dụng React Native đơn giản để ghi chú sử dụng Firebase Firestore cho việc lưu trữ dữ liệu theo thời gian thực.

## Tính năng

- Thêm ghi chú vào Firestore
- Hiển thị ghi chú theo thời gian thực từ Firestore
- Xóa ghi chú khỏi Firestore khi người dùng chạm vào

## Cài đặt

1. Clone repository
2. Cài đặt các gói phụ thuộc:
   ```
   npm install
   ```
3. Tạo dự án Firebase:
   - Truy cập [Firebase Console](https://console.firebase.google.com/)
   - Tạo dự án mới
   - Thêm ứng dụng Android 
   - Tải tệp `google-services.json` và đặt nó vào thư mục `android/app`
   - Cấu hình Firebase trong tệp `src/firebase/config.js` với thông tin từ dự án của bạn

## Chạy ứng dụng

```
npx react-native run-android
```

## Cấu trúc dự án

- `src/components`: Chứa các component tái sử dụng
- `src/screens`: Chứa các màn hình ứng dụng
- `src/firebase`: Chứa cấu hình Firebase

## Yêu cầu hệ thống

- Node.js
- React Native CLI
- Android Studio / XCode
- JDK
