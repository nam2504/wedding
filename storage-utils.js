// ============================================
// STORAGE UTILITIES - LocalStorage Helper
// Dùng chung cho Guestbook, RSVP, và các form khác
// ============================================

const StorageUtils = {
  /**
   * Lưu tên người dùng
   */
  saveName(name) {
    try {
      localStorage.setItem('wedding_guest_name', name);
      console.log('✅ Đã lưu tên:', name);
    } catch (e) {
      console.warn('Cannot save to localStorage:', e);
    }
  },

  /**
   * Lấy tên đã lưu
   */
  getName() {
    try {
      return localStorage.getItem('wedding_guest_name') || '';
    } catch (e) {
      console.warn('Cannot read from localStorage:', e);
      return '';
    }
  },

  /**
   * Auto-fill tên vào input field
   */
  autoFillName(inputSelector) {
    const name = this.getName();
    if (name) {
      const input = document.querySelector(inputSelector);
      if (input && !input.value) {
        input.value = name;
        console.log('✅ Auto-fill tên:', name);
      }
    }
  },

  /**
   * Lưu phone number
   */
  savePhone(phone) {
    try {
      localStorage.setItem('wedding_guest_phone', phone);
    } catch (e) {
      console.warn('Cannot save phone to localStorage:', e);
    }
  },

  /**
   * Lấy phone đã lưu
   */
  getPhone() {
    try {
      return localStorage.getItem('wedding_guest_phone') || '';
    } catch (e) {
      console.warn('Cannot read phone from localStorage:', e);
      return '';
    }
  },

  /**
   * Auto-fill phone vào input field
   */
  autoFillPhone(inputSelector) {
    const phone = this.getPhone();
    if (phone) {
      const input = document.querySelector(inputSelector);
      if (input && !input.value) {
        input.value = phone;
      }
    }
  },

  /**
   * Auto-fill tất cả fields
   */
  autoFillAll(nameSelector, phoneSelector = null) {
    this.autoFillName(nameSelector);
    if (phoneSelector) {
      this.autoFillPhone(phoneSelector);
    }
  },

  /**
   * Xóa tất cả dữ liệu đã lưu
   */
  clearAll() {
    try {
      localStorage.removeItem('wedding_guest_name');
      localStorage.removeItem('wedding_guest_phone');
      console.log('🗑️ Đã xóa cache');
    } catch (e) {
      console.warn('Cannot clear localStorage:', e);
    }
  }
};

// Export để sử dụng
if (typeof window !== 'undefined') {
  window.StorageUtils = StorageUtils;
}
