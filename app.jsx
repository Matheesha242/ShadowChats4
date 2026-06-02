Import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Modal
} from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('features'); // 'features' or 'pro'
  const [isPro, setIsPro] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  
  // Payment Form States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handlePayment = () => {
    if (!username || !email) {
      Alert.alert('Error', 'Please enter both Username and Email.');
      return;
    }
    
    // Simulate payment success
    setIsPro(true);
    setPaymentModalVisible(false);
    setActiveTab('pro');
    Alert.alert('Access Granted', `Welcome ${username}! Pro Mode is now Active.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CYBER_CORE</Text>
        <View style={[styles.statusBadge, isPro ? styles.badgePro : styles.badgeNormal]}>
          <Text style={styles.statusText}>{isPro ? 'PRO MODE' : 'NORMAL MODE'}</Text>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'features' && styles.activeTab]}
          onPress={() => setActiveTab('features')}
        >
          <Text style={[styles.tabText, activeTab === 'features' && styles.activeTabText]}>
            Features
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pro' && styles.activeTab]}
          onPress={() => setActiveTab('pro')}
        >
          <Text style={[styles.tabText, activeTab === 'pro' && styles.activeTabText]}>
            Pro Benefits
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.contentScroll}>
        {activeTab === 'features' ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Standard Features</Text>
            <View style={styles.featureItem}><Text style={styles.featureText}>✓ Basic Terminal Access</Text></View>
            <View style={styles.featureItem}><Text style={styles.featureText}>✓ Public Node Connection</Text></View>
            <View style={styles.featureItem}><Text style={styles.featureText}>✓ Standard Encryption</Text></View>
            <View style={styles.featureItem}><Text style={styles.featureText}>✓ Community Support</Text></View>
            
            {!isPro && (
              <TouchableOpacity 
                style={styles.upgradeButton}
                onPress={() => setPaymentModalVisible(true)}
              >
                <Text style={styles.upgradeButtonText}>Upgrade to Pro Mode</Text>
                <Text style={styles.priceSubtext}>£2.00 (approx. රු 800)</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { color: '#00e5ff' }]}>⚡ Pro Mode Unlocked</Text>
            
            <View style={styles.featureItem}><Text style={styles.featureText}>⚡ Advanced Penetration Tools</Text></View>
            <View style={styles.featureItem}><Text style={styles.featureText}>⚡ Dedicated Private Proxy Nodes</Text></View>
            <View style={styles.featureItem}><Text style={styles.featureText}>⚡ Quantum-Level Encryption</Text></View>
            <View style={styles.featureItem}><Text style={styles.featureText}>⚡ 24/7 Core Developer Support</Text></View>

            {!isPro ? (
              <View style={styles.lockedContainer}>
                <Text style={styles.lockedText}>🔒 These features are currently locked.</Text>
                <TouchableOpacity 
                  style={styles.upgradeButton}
                  onPress={() => setPaymentModalVisible(true)}
                >
                  <Text style={styles.upgradeButtonText}>Unlock Pro Now</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.unlockedBadge}>
                <Text style={styles.unlockedBadgeText}>You have full access to Pro Features.</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Payment Gateway Modal (แยกเป็น Tab/Modal เซฟพื้นที่และได้ฟีลลิ่งป็อปอัพสวยๆ) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentModalVisible}
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>SECURE PAYMENT GATEWAY</Text>
            <Text style={styles.modalSubtitle}>Activate Pro Mode for lifetime access.</Text>
            
            <View style={styles.priceTagContainer}>
              <Text style={styles.modalPrice}>£2.00</Text>
              <Text style={styles.modalPriceLkr}>~ රුපියල් 800.00</Text>
            </View>

            {/* Input Fields */}
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput 
              style={styles.input}
              placeholder="e.g., ghost_rider"
              placeholderTextColor="#555"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput 
              style={styles.input}
              placeholder="e.g., cyber@domain.com"
              placeholderTextColor="#555"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Pay Button */}
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Text style={styles.payButtonText}>Authorize & Pay Now</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setPaymentModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1d', // Deep dark blue-black background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerTitle: {
    color: '#00e5ff', // Glow blue
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeNormal: {
    backgroundColor: '#1e293b',
  },
  badgePro: {
    backgroundColor: 'rgba(0, 229, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#00e5ff',
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.4)',
  },
  tabText: {
    color: '#9ca3af',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: '#00e5ff',
  },
  contentScroll: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  featureItem: {
    backgroundColor: '#0a0f1d',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#00e5ff',
  },
  featureText: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  upgradeButton: {
    backgroundColor: '#00e5ff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#00e5ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  upgradeButtonText: {
    color: '#0a0f1d',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  priceSubtext: {
    color: '#0a0f1d',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },
  lockedContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
  },
  lockedText: {
    color: '#ef4444',
    fontSize: 13,
  },
  unlockedBadge: {
    marginTop: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  unlockedBadgeText: {
    color: '#10b981',
    fontWeight: '600',
  },
  // Modal (Payment Screen) Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 5, 10, 0.85)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#00e5ff',
  },
  modalTitle: {
    color: '#00e5ff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
  modalSubtitle: {
    color: '#9ca3af',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  priceTagContainer: {
    backgroundColor: '#0a0f1d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  modalPrice: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalPriceLkr: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 2,
  },
  inputLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#0a0f1d',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
    fontSize: 15,
  },
  payButton: {
    backgroundColor: '#00e5ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  payButtonText: {
    color: '#0a0f1d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#9ca3af',
    fontSize: 14,
  },
});
