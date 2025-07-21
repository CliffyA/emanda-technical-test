import React, { useState, useCallback } from 'react';
import { Task } from '../types';
import { useCreateTask } from '../hooks/useCreateTask';

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <div style={{color: "red"}}>
        {message}
    </div>;
};