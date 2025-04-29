
import { Layout } from "@/components/layout/Layout";
import { useResultsData } from "@/hooks/useResultsData";
import { LocationSearch } from "@/components/results/LocationSearch";
import { UserDataLoader } from "@/components/results/UserDataLoader";
import { LoadingIndicator } from "@/components/results/LoadingIndicator";
import { WeatherDisplay } from "@/components/results/WeatherDisplay";
import { SoilDataDisplay } from "@/components/results/SoilDataDisplay";
import { RecommendationDisplay } from "@/components/results/RecommendationDisplay";
import { ImageDisplay } from "@/components/results/ImageDisplay";

const Results = () => {
  const {
    location,
    weatherData,
    soilData,
    recommendationData,
    images,
    loadingWeather,
    loadingSoil,
    loadingRecommendation,
    loadingImages,
    isLoadingUserData,
    weatherProgress,
    soilProgress,
    recommendationProgress,
    imagesProgress,
    isLoading,
    handleLocationChange,
    handleSearch,
  } = useResultsData();

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <UserDataLoader isLoading={isLoadingUserData} />
        
        <LocationSearch 
          location={location}
          handleLocationChange={handleLocationChange}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />

        {loadingWeather && (
          <LoadingIndicator 
            message="Fetching weather data..." 
            progress={weatherProgress}
          />
        )}

        <WeatherDisplay weatherData={weatherData} />

        {loadingSoil && (
          <LoadingIndicator 
            message="Fetching soil data..." 
            progress={soilProgress}
          />
        )}

        <SoilDataDisplay soilData={soilData} />

        {loadingRecommendation && (
          <LoadingIndicator 
            message="Fetching recommendation data..." 
            progress={recommendationProgress}
          />
        )}

        <RecommendationDisplay recommendationData={recommendationData} />

        {loadingImages && (
          <LoadingIndicator 
            message="Fetching images..." 
            progress={imagesProgress} 
          />
        )}

        <ImageDisplay location={location} images={images} />
      </div>
    </Layout>
  );
};

export default Results;
