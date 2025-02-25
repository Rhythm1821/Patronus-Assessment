from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pdfplumber
import os

from .models import File
from .serializers import FileSerializer

class FileViewSet(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FileSerializer

    def get(self,request):
        files = File.objects.filter(user=self.request.user)
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)

class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        
        request.data['user'] = request.user.id
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("File saved!")

            # OCR operation here
            file_instance = serializer.instance
            print("file_instance.file",file_instance.file)
            file_path = file_instance.file.path
            print("file_path",file_path)
            ocr_text = self.perform_ocr(file_path)
            # Create a new file to store the OCR text
            ocr_file_name = f"{os.path.basename(file_instance.file.name)}.txt"
            ocr_file_path = os.path.join(os.path.dirname(file_instance.file.path), ocr_file_name)

            with open(ocr_file_path, "w") as f:
                f.write(ocr_text)


            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def perform_ocr(self, file_path):
        try:
            text=""
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    text += page.extract_text() + "\n"
            return text
        except Exception as e:
            print("OCR error:", e)
            return None

class FileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return File.objects.get(pk=pk)
        except File.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request,pk, format=None):
        file=self.get_object(pk)
        serializer=FileSerializer(file)
        return Response(serializer.data)
    
    def delete(self, request, pk, format=None):
        file=self.get_object(pk)
        file.delete()
        print("File deleted!")
        return Response(status=status.HTTP_204_NO_CONTENT)