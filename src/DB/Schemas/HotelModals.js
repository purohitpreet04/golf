import mongoose from "mongoose";

const HotelAmenitiesSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Schema.Types.ObjectId },
    addedByModal: { type: String, default: '' },
    hotelname: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    conutry: { type: String, default: '' },
    landmark: { type: String, default: '' },
    discription: { type: String, default: '' },
    smokingPolicy: { type: String, default: '' },
    parking: { type: String, enum: ["Free Parking", "Paid Parking", "Valet Parking"], default: "Free Parking" },
    smokingPolicy: { type: String, enum: ["Smoking", "Non-Smoking"], default: "Non-Smoking" },
    website: {
        type: String,
        trim: true,
    },
    mapUrl: {
        type: String,
        trim: true,
    },
    whatsapp: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: String,
        trim: true,
    },
    facebook: {
        type: String,
        trim: true,
    },
    instagram: {
        type: String,
        trim: true,
    },
    twitter: {
        type: String,
        trim: true,
    },
    linkedIn: {
        type: String,
        trim: true,
    },
    logo: {
        type: String,
        trim: true,
    },
    images: {
        type: String,
        trim: true,
    },
    general: {
        coupleAllowed: { type: Boolean, default: false },
        freeWiFi: { type: Boolean, default: false },
        swimmingPool: { type: Boolean, default: false },
        gym: { type: Boolean, default: false },
        spa: { type: Boolean, default: false },
        restaurant: { type: Boolean, default: false },
        bar: { type: Boolean, default: false },
        businessCenter: { type: Boolean, default: false },
        conferenceRooms: { type: Boolean, default: false },
        petFriendly: { type: Boolean, default: false },
        airportShuttle: { type: Boolean, default: false },
        frontDesk24: { type: Boolean, default: true },
        concierge: { type: Boolean, default: false },
        laundryService: { type: Boolean, default: false },
        dailyHousekeeping: { type: Boolean, default: false },
        currencyExchange: { type: Boolean, default: false },
    },
    roomAmenities: {
        airConditioning: { type: Boolean, default: true },
        heating: { type: Boolean, default: false },
        flatScreenTV: { type: Boolean, default: false },
        miniBar: { type: Boolean, default: false },
        coffeeMaker: { type: Boolean, default: false },
        refrigerator: { type: Boolean, default: false },
        microwave: { type: Boolean, default: false },
        roomSafe: { type: Boolean, default: false },
        privateBalcony: { type: Boolean, default: false },
        bathtub: { type: Boolean, default: false },
        hairdryer: { type: Boolean, default: false },
        iron: { type: Boolean, default: false },
        soundproofRooms: { type: Boolean, default: false },
        workDesk: { type: Boolean, default: false }
    },
    entertainment: {
        casino: { type: Boolean, default: false },
        golfCourse: { type: Boolean, default: false },
        tennisCourt: { type: Boolean, default: false },
        liveMusic: { type: Boolean, default: false },
        childrenPlayground: { type: Boolean, default: false },
        gameRoom: { type: Boolean, default: false },
        bicycleRental: { type: Boolean, default: false },
        hikingTrails: { type: Boolean, default: false },
        waterSports: { type: Boolean, default: false }
    },

    dining: {
        breakfastIncluded: { type: Boolean, default: false },
        buffetBreakfast: { type: Boolean, default: false },
        roomService: { type: Boolean, default: false },
        specialDietMenus: { type: Boolean, default: false },
        barbecueFacilities: { type: Boolean, default: false },
        snackBar: { type: Boolean, default: false }
    },

    accessibility: {
        wheelchairAccessible: { type: Boolean, default: false },
        accessibleRooms: { type: Boolean, default: false },
        elevator: { type: Boolean, default: false },
        brailleSignage: { type: Boolean, default: false },
        hearingAidServices: { type: Boolean, default: false }
    },
    status: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("HotelAmenities", HotelAmenitiesSchema);
