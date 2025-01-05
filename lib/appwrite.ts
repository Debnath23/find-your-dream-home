import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import Property from "@/types/property.type";

export const config = {
  platform: "com.dm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export const login = async () => {
  try {
    const redirectUri = Linking.createURL("/");

    const response = account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Failed to login");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") throw new Error("Failed to login");

    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();

    if (!user) throw new Error("Failed to get user");

    if (user.$id) {
      const userAvatar = avatar.getInitials(user.name);

      return {
        ...user,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLatestProperties = async () => {
  try {
    const properties = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    if (!properties) throw new Error("Failed to get properties");

    return properties.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProperties = async ({
  filter = "",
  query = "",
  limit = 6,
}: {
  filter?: string;
  query?: string;
  limit?: number;
}): Promise<Property[]> => {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "all") {
      buildQuery.push(Query.equal("type", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );
    }

    if (limit) buildQuery.push(Query.limit(limit));

    const properties = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    if (!properties) throw new Error("Failed to get properties");

    return properties.documents as Property[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPropertyById = async ({
  id,
}: {
  id: string;
}): Promise<Property | null> => {
  try {
    const property = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );

    if (!property) throw new Error("Failed to get property");

    return property as Property;
  } catch (error) {
    console.error(error);
    return null;
  }
};
