import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';

/**
 * Standardized ActivityIndicator that ensures consistent size prop types
 * throughout the application to avoid "Unable to convert string to floating point value" errors.
 * 
 * @param {Object} props - Component props
 * @param {string|number} props.size - Size of the indicator (converted to number if string)
 * @param {string} props.color - Color of the indicator
 * @returns {React.Component} Standardized ActivityIndicator
 */
const StandardActivityIndicator = ({ size = 'small', color = '#2196F3', ...otherProps }) => {
  // CRITICAL: Always convert any size value to a numeric value to prevent 
  // "Unable to convert string to floating point value" errors
  let numericSize;
  
  if (typeof size === 'number') {
    // Already a number, use as is
    numericSize = size;
  } else if (size === 'large') {
    // Convert 'large' to appropriate platform-specific number
    numericSize = Platform.OS === 'ios' ? 40 : 36;
  } else if (size === 'small') {
    // Convert 'small' to appropriate platform-specific number
    numericSize = Platform.OS === 'ios' ? 20 : 22;
  } else {
    // Default fallback
    numericSize = 24;  
  }
  
  return (
    <ActivityIndicator 
      size={numericSize} 
      color={color}
      {...otherProps}
    />
  );
};

export default StandardActivityIndicator;
