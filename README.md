# Hablemos Móvil
Hablemos es el MVP de una aplicación móvil para la interpretación de Lengua de Señas Colombiana (LSC) a Español (Esp en la imagen) y viceversa.

![Screenshot 2025-03-20 132433](https://github.com/user-attachments/assets/a2c71c20-0d9d-4094-b3bb-8bec0e961220)

Desarrollada en ReactNative con JavaScript, hace uso de un plugin que permite el reconocimiento de manos en tiempo real gracias al modelo "HandLandmark" de MediaPipe. 
Para la interpretación de los gestos identificados, se consume una API desarrollada en DjangoRest y alojada en la plataforma Render que ejecuta un modelo de IA basado en redes neuronales que clasifica la secuencia encontrada en una o ninguna de las 10 señas que conoce y envía el resultado para ser mostrado en la aplicación. También incluye funcionalidades para la traducción liteal de texto a una seña, la traducción de texto a audio y de audio a texto, visualizar una colección de señas en el diccionario y compartir una seña.

https://github.com/user-attachments/assets/5d9ec086-6487-484a-bc80-a14cc9341765




