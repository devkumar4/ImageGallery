import { ActivityIndicator, FlatList, ScrollView, StatusBar, StyleSheet, Text, View, Image, Dimensions, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Images } from '../API/api';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/Theme';

const { width, height } = Dimensions.get('window');

const ShowImages = async () => {
    try {
        let response = await fetch(Images);
        let json = await response.json();
        return json;
    } catch (error) {
        console.log(
            'Something went wrong in getNowPlayingMoviesList Function',
            error,
        );
    }
};

const HomeScreen = () => {
    const [showImages, setShowImages] = useState();
    const [refresh, setRefresh] = useState();
    const pullme = () => {
        setRefresh(true)
    }
    setTimeout(() => {
        setRefresh(false)

    }, 10000)
    useEffect(() => {
        (async () => {
            let ImagesShow = await ShowImages();
            setShowImages(ImagesShow.photos.photo);

        })();
    }, []);
    console.log(showImages);
    // console.log(showImages.photos.photo.title);

    if (showImages == undefined && showImages == null) {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl

                        refreshing={refresh}
                        onRefresh={() => pullme()}

                    />
                }
                style={styles.container}
                bounces={false}
                contentContainerStyle={styles.scrollViewContainer}>
                <StatusBar hidden />

                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={COLORS.Black} />
                </View>
            </ScrollView>
        )
    }
    return (
        <ScrollView
            refreshControl={
                <RefreshControl

                    refreshing={refresh}
                    onRefresh={() => pullme()}

                />
            }
            style={styles.container}
            bounces={false}
            contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.text}>IMAGE GALLERY</Text>
            <StatusBar hidden />
            <FlatList
                data={showImages}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <View>

                            <Image
                                source={{ uri: item?.url_s }}
                                style={styles.Images}
                            />
                            {/* <CacheImage
                                style={styles.Images}
                                uri={{ uri: item?.url_s }}
                            /> */}
                        </View>
                    )
                }}
            // horizontal
            />


        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: COLORS.WhiteRGBA15,
        width: "100%",
        height: "100%"
    },
    container: {
        display: 'flex',
        backgroundColor: COLORS.WhiteRGBA50,
    },
    Container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
        flex: 1,
    },
    Images: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        margin: SPACING.space_10,
        width: width * 0.7,
        height: height / 2,
        // aspectRatio: 3 / 2,
        borderRadius: BORDERRADIUS.radius_20,
        borderColor: COLORS.Black

    },
    text: {
        color: COLORS.Black,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_30,
        alignSelf: "center",
        paddingVertical: SPACING.space_10
    }

})