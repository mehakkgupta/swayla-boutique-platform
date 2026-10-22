/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WorkflowNavigator } from './components/layout/WorkflowNavigator';
import { DeviceFrame } from './components/layout/DeviceFrame';

// Auth & Onboarding
import { LoginScreen } from './components/auth/LoginScreen';
import { SplashScreen } from './components/auth/SplashScreen';
import { OnboardingScreen } from './components/auth/OnboardingScreen';
import { IntroScreen } from './components/auth/IntroScreen';
import { ForgotPasswordScreen } from './components/auth/ForgotPasswordScreen';
import { SellerRegisterScreen } from './components/auth/SellerRegisterScreen';
import { BuyerRegisterScreen } from './components/auth/BuyerRegisterScreen';

// Seller Flow
import { SellerDashboard } from './components/seller/SellerDashboard';
import { SellerBoutiqueView } from './components/seller/SellerBoutiqueView';
import { SellerProductDetail } from './components/seller/SellerProductDetail';
import { AddProductModal } from './components/seller/AddProductModal';
import { EditProductModal } from './components/seller/EditProductModal';
import { DiscountOfferModal } from './components/seller/DiscountOfferModal';

// Buyer Flow
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { BuyerProductDetail } from './components/buyer/BuyerProductDetail';
import { BuyerCartModal } from './components/buyer/BuyerCartModal';
import { BuyerCheckoutModal } from './components/buyer/BuyerCheckoutModal';

// Buyer Modals
import { CouponsModal } from './components/buyer/CouponsModal';
import { SavedItemsModal } from './components/buyer/SavedItemsModal';
import { SavedCardsModal } from './components/buyer/SavedCardsModal';

// Full Screen Image Viewer Modal
import { FullscreenImageModal } from './components/common/FullscreenImageModal';

const MainScreenRouter: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'login':
      return <LoginScreen />;
    case 'splash':
      return <SplashScreen />;
    case 'onboarding':
      return <OnboardingScreen />;
    case 'intro':
      return <IntroScreen />;
    case 'forgot_password':
      return <ForgotPasswordScreen />;
    case 'seller_register':
      return <SellerRegisterScreen />;
    case 'buyer_register':
      return <BuyerRegisterScreen />;
    case 'seller_dashboard':
      return <SellerDashboard />;
    case 'seller_boutique':
      return <SellerBoutiqueView />;
    case 'seller_product_detail':
      return <SellerProductDetail />;
    case 'buyer_dashboard':
    case 'buyer_home':
      return <BuyerDashboard />;
    case 'buyer_product_detail':
      return <BuyerProductDetail />;
    default:
      return <LoginScreen />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 font-sans">
        {/* Top Header with App Status and Workflow Chart */}
        <WorkflowNavigator />

        {/* Device Frame (Figma Mobile Artboard or Fluid Desktop) */}
        <DeviceFrame>
          <MainScreenRouter />
        </DeviceFrame>

        {/* Global Modals & Drawers */}
        <AddProductModal />
        <EditProductModal />
        <DiscountOfferModal />
        <BuyerCartModal />
        <BuyerCheckoutModal />
        <CouponsModal />
        <SavedItemsModal />
        <SavedCardsModal />
        <FullscreenImageModal />
      </div>
    </AppProvider>
  );
}
