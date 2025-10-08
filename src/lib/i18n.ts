import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation & Common
      dashboard: 'Dashboard',
      storage: 'Storage',
      marketplace: 'Marketplace',
      compute: 'Compute',
      wallet: 'Wallet',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',
      login: 'Login',
      signup: 'Sign Up',
      
      // Dashboard
      welcomeBack: 'Welcome Back',
      networkStats: 'Network Statistics',
      totalNodes: 'Total Nodes',
      activeUsers: 'Active Users',
      totalStorage: 'Total Storage',
      computePower: 'Compute Power',
      
      // Storage
      myFiles: 'My Files',
      uploadFile: 'Upload File',
      fileName: 'File Name',
      fileSize: 'File Size',
      uploadDate: 'Upload Date',
      status: 'Status',
      actions: 'Actions',
      download: 'Download',
      share: 'Share',
      delete: 'Delete',
      storageUsed: 'Storage Used',
      storageAvailable: 'Storage Available',
      
      // Marketplace
      availableNodes: 'Available Nodes',
      nodeLocation: 'Location',
      nodePrice: 'Price',
      nodeRating: 'Rating',
      nodeUptime: 'Uptime',
      rentNode: 'Rent Node',
      viewDetails: 'View Details',
      
      // Wallet
      balance: 'Balance',
      veloraTokens: 'VLR Tokens',
      transactions: 'Transactions',
      send: 'Send',
      receive: 'Receive',
      stake: 'Stake',
      unstake: 'Unstake',
      transactionHistory: 'Transaction History',
      
      // Auth
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      displayName: 'Display Name',
      forgotPassword: 'Forgot Password?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      signInToAccount: 'Sign in to your account',
      createNewAccount: 'Create a new account',
      
      // Messages
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Information',
      loading: 'Loading...',
      noData: 'No data available',
      
      // Accessibility
      skipToContent: 'Skip to content',
      menuButton: 'Menu button',
      closeDialog: 'Close dialog',
      previousPage: 'Previous page',
      nextPage: 'Next page',
      
      // PWA
      installApp: 'Install App',
      updateAvailable: 'Update Available',
      updateApp: 'Update App',
      workingOffline: 'Working Offline',
    }
  },
  id: {
    translation: {
      // Navigation & Common
      dashboard: 'Dasbor',
      storage: 'Penyimpanan',
      marketplace: 'Pasar',
      compute: 'Komputasi',
      wallet: 'Dompet',
      settings: 'Pengaturan',
      profile: 'Profil',
      logout: 'Keluar',
      login: 'Masuk',
      signup: 'Daftar',
      
      // Dashboard
      welcomeBack: 'Selamat Datang Kembali',
      networkStats: 'Statistik Jaringan',
      totalNodes: 'Total Node',
      activeUsers: 'Pengguna Aktif',
      totalStorage: 'Total Penyimpanan',
      computePower: 'Daya Komputasi',
      
      // Storage
      myFiles: 'File Saya',
      uploadFile: 'Unggah File',
      fileName: 'Nama File',
      fileSize: 'Ukuran File',
      uploadDate: 'Tanggal Unggah',
      status: 'Status',
      actions: 'Aksi',
      download: 'Unduh',
      share: 'Bagikan',
      delete: 'Hapus',
      storageUsed: 'Penyimpanan Terpakai',
      storageAvailable: 'Penyimpanan Tersedia',
      
      // Marketplace
      availableNodes: 'Node Tersedia',
      nodeLocation: 'Lokasi',
      nodePrice: 'Harga',
      nodeRating: 'Rating',
      nodeUptime: 'Waktu Aktif',
      rentNode: 'Sewa Node',
      viewDetails: 'Lihat Detail',
      
      // Wallet
      balance: 'Saldo',
      veloraTokens: 'Token VLR',
      transactions: 'Transaksi',
      send: 'Kirim',
      receive: 'Terima',
      stake: 'Stake',
      unstake: 'Unstake',
      transactionHistory: 'Riwayat Transaksi',
      
      // Auth
      email: 'Email',
      password: 'Kata Sandi',
      confirmPassword: 'Konfirmasi Kata Sandi',
      displayName: 'Nama Tampilan',
      forgotPassword: 'Lupa Kata Sandi?',
      dontHaveAccount: 'Belum punya akun?',
      alreadyHaveAccount: 'Sudah punya akun?',
      signInToAccount: 'Masuk ke akun Anda',
      createNewAccount: 'Buat akun baru',
      
      // Messages
      success: 'Berhasil',
      error: 'Kesalahan',
      warning: 'Peringatan',
      info: 'Informasi',
      loading: 'Memuat...',
      noData: 'Tidak ada data tersedia',
      
      // Accessibility
      skipToContent: 'Lewati ke konten',
      menuButton: 'Tombol menu',
      closeDialog: 'Tutup dialog',
      previousPage: 'Halaman sebelumnya',
      nextPage: 'Halaman selanjutnya',
      
      // PWA
      installApp: 'Install Aplikasi',
      updateAvailable: 'Update Tersedia',
      updateApp: 'Update Aplikasi',
      workingOffline: 'Bekerja Offline',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;