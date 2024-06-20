import CardModel , { CardInterface } from "../models/cardModel";
import { Request, Response } from "express";
import UserModel from "../models/userModel";


const addCard = async (req: Request, res: Response) => {
    const {
        card_id,
        imageTitle,
        creatorName,
        likes,
        views,
        sort_by,
        type,
        price_type,
        category,
        file_extension,
        availability,
        country,
        tools,
        color_of_the_image,
        colors_used,
        tools_list,
        countries_list,
        file_extension_list,
        images
    } = req.body;

    console.log(req.body);

    try {
        console.log("Entered thr try block");
        const card = new CardModel({
            card_id,
            imageTitle,
            creatorName,
            likes,
            views,
            sort_by,
            type,
            price_type,
            category,
            file_extension,
            availability,
            country,
            tools,
            color_of_the_image,
            colors_used,
            tools_list,
            countries_list,
            file_extension_list,
            images
        });

        console.log(card);
        const savedProperty = await card.save();
        res.status(201).json({
            "message":"Card Added successfully",
            "status":"success"
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


const addManyCards = async (req: Request, res: Response) => {
    const cards = req.body; // Assuming the body contains an array of card objects
    try {
        const savedCards = await CardModel.insertMany(cards);
        res.status(201).json({
            message: "Cards added successfully",
            status: "success",
            data: savedCards
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};



const deleteCard = async (req: Request, res: Response) => {
    try {
        const deletedCard = await CardModel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCard);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const deleteAllCards = async (req: Request, res:Response) => {
    try {
        const deleteResult = await CardModel.deleteMany({});
        res.status(200).json({
            message: `${deleteResult.deletedCount} cards deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
const getAllCards = async (req: Request, res: Response) => {
    try{
        const cards=await CardModel.find();
        res.status(200).json({
            "message":"All Cards fetched Successfully",
            "properties":cards,
            "status":"success"
        });
    }
    catch(error){
        res.status(500).json({message: error});
    }
}
const getCard = async (req: Request, res: Response) => {
    try{
        const card=await CardModel.findById(req.params.id);

        console.log(card)

        res.status(200).json({
            "message":"Card Details fetched Successfully",
            "property":card,
            "status":"success"
        });
    }
    catch(error){
        res.status(500).json({message: error});
    }
}

const likeCard = async (req: Request, res: Response) => {
    try {
        const likedCard=await CardModel.findByIdAndUpdate(req.params.id, {
            $inc: { likes: 1 }
        });



        res.status(200).json({
            "message":"Card liked",
            "status":"success"
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export default {
    addCard,
    addManyCards,
    deleteCard,
    deleteAllCards,
    getAllCards,
    getCard,
    likeCard
};