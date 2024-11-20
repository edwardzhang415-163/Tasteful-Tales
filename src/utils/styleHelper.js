// Colors
export const COLORS = {
  primary: '#FF6B6B',
  secondary: '#f5f5f5',
  text: {
    primary: '#000000',
    secondary: '#666666',
    light: '#ffffff'
  },
  border: '#dddddd',
  background: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    overlay: 'rgba(0,0,0,0.5)'
  },
  status: {
    success: '#4CAF50',
    error: '#f44336',
    warning: '#ff9800',
    disabled: '#cccccc'
  }
};

// Layout
export const LAYOUT = {
  padding: {
    xs: 5,
    sm: 8,
    md: 10,
    lg: 15,
    xl: 20,
    xxl: 40
  },
  borderRadius: {
    sm: 8,
    md: 10,
    lg: 15,
    xl: 20,
    circle: 50
  },
  gap: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20
  }
};

// Typography
export const TYPOGRAPHY = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24
  },
  fontWeight: {
    normal: 'normal',
    medium: '500',
    bold: 'bold'
  }
};

// Common Styles
export const COMMON_STYLES = {
  // Shadows
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  // Containers
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary
  },
  // Buttons
  button: {
    primary: {
      backgroundColor: COLORS.primary,
      padding: LAYOUT.padding.md,
      borderRadius: LAYOUT.borderRadius.md,
      alignItems: 'center'
    },
    secondary: {
      backgroundColor: COLORS.secondary,
      padding: LAYOUT.padding.md,
      borderRadius: LAYOUT.borderRadius.md,
      alignItems: 'center'
    }
  },
  // Inputs
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: LAYOUT.borderRadius.md,
    padding: LAYOUT.padding.md,
    fontSize: TYPOGRAPHY.fontSize.md
  },
  // Cards
  card: {
    backgroundColor: COLORS.background.primary,
    borderRadius: LAYOUT.borderRadius.md,
    padding: LAYOUT.padding.lg,
    ...this.shadow
  }
};

// Helper functions
export const getResponsiveDimension = (dimension, factor = 1) => {
  return dimension * factor;
};

// Image dimensions
export const IMAGE_DIMENSIONS = {
  thumbnail: {
    width: 100,
    height: 100
  },
  preview: {
    width: '100%',
    height: 300
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
}; 