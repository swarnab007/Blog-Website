import config from "../config/config";
import { ID, Client, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_projectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Create a new post
  async createPost({ title, content, slug, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        config.appwrite_databaseID,
        config.appwrite_collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Error in creating post", error);
    }
  }

  // upadate post
  async updatePost(slug, { title, content, featuredImage, status, userID }) {
    try {
      return await this.databases.updateDocument(
        config.appwrite_databaseID,
        config.appwrite_collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Error in updating post", error);
    }
  }

  // delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwrite_databaseID,
        config.appwrite_collectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Error in deleting post", error);
      return false;
    }
  }

  // get all posts
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwrite_databaseID,
        config.appwrite_collectionId,
        slug
      );
    } catch (error) {
      console.log("Error in getting posts", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwrite_bucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error in uploading file", error);
      return false;
    }
  }

  // delete file
  async deleteFile(fileID) {
    try {
      await this.storage.deleteFile(config.appwrite_bucketId, fileID);
      return true;
    } catch (error) {
      console.log("Error in deleting file", error);
      return false;
    }
  }

  //  preview file
  previewFile(fileID) {
    try {
      return this.storage.getFileView(config.appwrite_bucketId, fileID);
    } catch (error) {
      console.log("Error in previewing file", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
