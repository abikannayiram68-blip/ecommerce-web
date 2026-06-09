import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.MINIO_BUCKET_NAME || 'products';
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000', 10),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    });
  }

  async uploadFile(file: Express.Multer.File, keyPrefix: string = 'product-images'): Promise<{ url: string; key: string }> {
    const key = `${keyPrefix}/${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    
    try {
      await this.minioClient.putObject(
        this.bucketName,
        key,
        file.buffer,
        file.size,
        { 'Content-Type': file.mimetype }
      );
      
      const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
      const port = process.env.MINIO_PORT || '9000';
      const useSSL = process.env.MINIO_USE_SSL === 'true';
      const protocol = useSSL ? 'https' : 'http';
      
      // Construct public URL
      const url = `${protocol}://${endpoint}:${port}/${this.bucketName}/${key}`;
      return { url, key };
    } catch (error) {
      console.error('MinIO upload error:', error);
      throw new InternalServerErrorException('Error uploading file to MinIO');
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      await this.minioClient.removeObject(this.bucketName, key);
    } catch (error) {
      console.error(`Failed to delete object ${key} from MinIO`, error);
      // We log but don't throw, so we don't break database deletions if the file is already gone
    }
  }
}
