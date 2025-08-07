// Multi-language support system
const translations = {
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      next: 'Next',
      back: 'Back',
      loading: 'Loading...',
      error: 'Error occurred'
    },
    navigation: {
      dashboard: 'Dashboard',
      bodyShape: 'Body Shape',
      skinTone: 'Skin Tone',
      aiStylist: 'AI Stylist',
      community: 'Community',
      wardrobe: 'Wardrobe'
    },
    onboarding: {
      welcome: 'Welcome to ToneFitStyle',
      tagline: 'Dress smart. Feel confident. Own your tone.',
      getStarted: 'Get Started'
    }
  },
  es: {
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      next: 'Siguiente',
      back: 'Atrás',
      loading: 'Cargando...',
      error: 'Ocurrió un error'
    },
    navigation: {
      dashboard: 'Panel',
      bodyShape: 'Forma Corporal',
      skinTone: 'Tono de Piel',
      aiStylist: 'Estilista IA',
      community: 'Comunidad',
      wardrobe: 'Guardarropa'
    },
    onboarding: {
      welcome: 'Bienvenido a ToneFitStyle',
      tagline: 'Viste inteligente. Siéntete seguro. Domina tu tono.',
      getStarted: 'Comenzar'
    }
  },
  fr: {
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      next: 'Suivant',
      back: 'Retour',
      loading: 'Chargement...',
      error: 'Erreur survenue'
    },
    navigation: {
      dashboard: 'Tableau de bord',
      bodyShape: 'Forme du corps',
      skinTone: 'Teint',
      aiStylist: 'Styliste IA',
      community: 'Communauté',
      wardrobe: 'Garde-robe'
    },
    onboarding: {
      welcome: 'Bienvenue sur ToneFitStyle',
      tagline: 'Habillez-vous intelligemment. Sentez-vous confiant.',
      getStarted: 'Commencer'
    }
  }
}

let currentLanguage = 'en'

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang
    localStorage.setItem('app_language', lang)
    document.documentElement.lang = lang
  }
}

export const getCurrentLanguage = () => {
  return localStorage.getItem('app_language') || currentLanguage
}

export const t = (key) => {
  const keys = key.split('.')
  let value = translations[currentLanguage]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

export const initializeI18n = () => {
  const savedLang = localStorage.getItem('app_language')
  if (savedLang) {
    setLanguage(savedLang)
  } else {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0]
    if (translations[browserLang]) {
      setLanguage(browserLang)
    }
  }
}