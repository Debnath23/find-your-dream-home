import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";
import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";
import { Colors } from "@/constants/Colors";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={[styles.imageContainer, { height: windowHeight / 2 }]}>
          <Image
            source={{
              uri:
                typeof property?.image === "string"
                  ? property.image
                  : undefined,
            }}
            style={styles.image}
          />
          <Image source={images.whiteGradient} style={styles.gradientImage} />
          <View
            style={[
              styles.headerWrapper,
              {
                top: Platform.OS === "ios" ? 70 : 20,
              },
            ]}
          >
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Image source={icons.backArrow} style={styles.icon} />
              </TouchableOpacity>

              <View style={styles.headerIcons}>
                <Image
                  source={icons.heart}
                  style={[styles.icon, { tintColor: "#191D31" }]}
                />
                <Image source={icons.send} style={styles.icon} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.propertyInfoContainer}>
          <Text style={styles.propertyName}>{property?.name}</Text>

          <View style={styles.propertyTypeContainer}>
            <View style={styles.propertyType}>
              <Text style={styles.propertyTypeText}>{property?.type}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Image source={icons.star} style={styles.icon} />
              <Text style={styles.ratingText}>
                {property?.rating} (
                {Array.isArray(property?.reviews) ? property.reviews.length : 0}{" "}
                reviews)
              </Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailsItem}>
              <Image source={icons.bed} style={styles.iconSmall} />
              <Text style={styles.detailsText}>{property?.bedrooms} Beds</Text>
            </View>
            <View style={styles.detailsItem}>
              <Image source={icons.bath} style={styles.iconSmall} />
              <Text style={styles.detailsText}>
                {property?.bathrooms} Baths
              </Text>
            </View>
            <View style={styles.detailsItem}>
              <Image source={icons.area} style={styles.iconSmall} />
              <Text style={styles.detailsText}>{property?.area} sqft</Text>
            </View>
          </View>

          <View style={styles.agentContainer}>
            <Text style={styles.agentTitle}>Agent</Text>

            <View style={styles.agentInfo}>
              <View style={styles.agentPersonalInfo}>
                <Image
                  source={{
                    uri:
                      typeof property?.agent === "object" &&
                      property?.agent !== null &&
                      "avatar" in property.agent
                        ? String(property.agent.avatar)
                        : undefined,
                  }}
                  style={styles.agentAvatar}
                />
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>
                    {typeof property?.agent === "object" &&
                    property?.agent !== null &&
                    "name" in property.agent
                      ? (property.agent as { name: string }).name
                      : undefined}
                  </Text>
                  <Text style={styles.agentEmail}>
                    {typeof property?.agent === "object" &&
                    property?.agent !== null &&
                    "email" in property.agent
                      ? (property.agent as { email: string }).email
                      : undefined}
                  </Text>
                </View>
              </View>

              <View style={styles.agentActions}>
                <Image source={icons.chat} style={styles.agentInfoIcon} />
                <Image source={icons.phone} style={styles.agentInfoIcon} />
              </View>
            </View>
          </View>

          <View style={styles.overviewContainer}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overviewText}>{property?.description}</Text>
          </View>

          <View style={styles.facilitiesContainer}>
            {Array.isArray(property?.facilities) &&
              property.facilities.length > 0 && (
                <View style={styles.facilitiesContainer}>
                  <Text style={styles.sectionTitle}>Facilities</Text>
                  <View style={styles.facilitiesList}>
                    {property?.facilities?.map((item, index) => {
                      const facility = facilities.find(
                        (facility) => facility.title === item
                      );
                      return (
                        <View key={index} style={styles.facilityItem}>
                          <View style={styles.facilityIconWrapper}>
                            <Image
                              source={facility ? facility.icon : icons.info}
                              style={styles.iconMedium}
                            />
                          </View>
                          <Text style={styles.facilityTitle}>{item}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
          </View>

          {Array.isArray(property?.gallery) &&
            property?.gallery?.length > 0 && (
              <View style={styles.galleryContainer}>
                <Text style={styles.sectionTitle}>Gallery</Text>
                <FlatList
                  contentContainerStyle={styles.galleryList}
                  data={property?.gallery}
                  keyExtractor={(item) =>
                    typeof item === "object" && item !== null && "$id" in item
                      ? (item as { $id: string }).$id
                      : Math.random().toString()
                  }
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    const galleryItem = item as unknown as { image: string };
                    if (galleryItem && galleryItem.image) {
                      return (
                        <Image
                          source={{ uri: galleryItem.image }}
                          style={styles.galleryImage}
                        />
                      );
                    }
                    return null;
                  }}
                />
              </View>
            )}

          <View style={styles.locationContainer}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationInfo}>
              <Image source={icons.location} style={styles.iconLocation} />
              <Text style={styles.locationText}>{property?.address}</Text>
            </View>
            <Image source={images.map} style={styles.mapImage} />
          </View>

          {Array.isArray(property?.reviews) &&
            property?.reviews?.length > 0 && (
              <View style={styles.reviewsContainer}>
                <View style={styles.reviewsHeader}>
                  <View style={styles.reviewsHeaderInfo}>
                    <Image source={icons.star} style={styles.iconSmall} />
                    <Text style={styles.reviewsTitle}>
                      {property?.rating} ({property?.reviews?.length} reviews)
                    </Text>
                  </View>

                  <TouchableOpacity>
                    <Text style={styles.viewAllText}>View All</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.commentContainer}>
                  {property?.reviews[0] && (
                    <Comment item={property?.reviews[0]} />
                  )}
                </View>
              </View>
            )}
        </View>
      </ScrollView>

      <View style={styles.bookNowContainer}>
        <View style={styles.bookNowWrapper}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceText}>${property?.price}</Text>
          </View>

          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  gradientImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 40,
  },
  headerWrapper: {
    position: "absolute",
    left: 7,
    right: 7,
    zIndex: 50,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  propertyInfoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 8,
  },
  propertyName: {
    fontSize: 24,
    fontFamily: "Bold",
  },
  propertyTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  propertyType: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.PRIMARY2,
    borderRadius: 50,
  },
  propertyTypeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.PRIMARY1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  ratingText: {
    color: Colors.BLACK2,
    fontFamily: "Bold",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY2,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 100,
    gap: 10,
  },
  iconSmall: {
    width: 16,
    height: 16,
  },
  detailsText: {
    fontFamily: "Regular",
    fontSize: 12,
    color: Colors.BLACK1,
  },
  agentContainer: {
    marginTop: 18,
  },
  agentTitle: {
    fontSize: 20,
    fontFamily: "Bold",
  },
  agentInfo: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  agentPersonalInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  agentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  agentDetails: {
    flexDirection: "column",
    justifyContent: "center",
  },
  agentName: {
    fontSize: 16,
    fontFamily: "Medium",
    color: Colors.BLACK1,
  },
  agentEmail: {
    color: Colors.BLACK2,
    fontFamily: "Regular",
    fontSize: 12,
  },
  agentActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "flex-end",
  },
  agentInfoIcon: {
    width: 24,
    height: 24,
  },
  overviewContainer: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Bold",
  },
  overviewText: {
    lineHeight: 22,
    color: Colors.BLACK2,
    fontFamily: "Regular",
  },
  facilitiesContainer: {
    marginTop: 10,
  },
  facilitiesList: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
  },
  facilityItem: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  facilityIconWrapper: {
    backgroundColor: Colors.PRIMARY2,
    padding: 6,
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  iconMedium: {
    width: 28,
    height: 28,
  },
  facilityTitle: {
    fontSize: 12,
    fontFamily: "Medium",
    color: Colors.BLACK2,
  },
  galleryContainer: {
    marginTop: 10,
  },
  galleryList: {
    marginTop: 12,
    gap: 12,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  locationContainer: {
    marginTop: 30,
  },
  locationInfo: {
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
  },
  iconLocation: {
    width: 16,
    height: 16,
  },
  locationText: {
    color: "#BDBDBD",
    fontWeight: "600",
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginTop: 20,
  },
  reviewsContainer: {
    marginTop: 30,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewsHeaderInfo: {
    flexDirection: "row",
    gap: 6,
  },
  reviewsTitle: {
    color: "#BDBDBD",
    fontSize: 12,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#FF4081",
    fontSize: 12,
    fontWeight: "bold",
  },
  commentContainer: {
    marginTop: 12,
  },
  bookNowContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: "#FFFFFF",
    padding: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -10 },
    shadowRadius: 10,
  },
  bookNowWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceContainer: {
    gap: 4,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#BDBDBD",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bookNowButton: {
    backgroundColor: "#FF4081",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  bookNowText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Property;
