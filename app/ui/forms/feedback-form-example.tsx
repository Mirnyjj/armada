"use client";
import { useState } from "react";
import { FeedbackForm } from "./feedback-form";
import { Button } from "../button/button";

export const FeedbackFormExample = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Форма обратной связи
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Нажмите кнопку ниже, чтобы открыть форму обратной связи
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => setIsFormOpen(true)}
            size="lg"
            className="w-full sm:w-auto"
          >
            Открыть форму
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsFormOpen(true)}
            className="w-full sm:w-auto"
          >
            Связаться с нами
          </Button>
        </div>

        {/* Форма обратной связи */}
        <FeedbackForm 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
        />
      </div>
    </div>
  );
}; 