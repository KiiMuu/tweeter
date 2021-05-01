declare module 'myTypes' {
    type TweetaType = {
        content: string,
        images: object[],
        postedBy: object,
        retweetData: object[],
        retweeters: object[],
        createdAt: string,
        updatedAt: string,
        _id: string,
    }
  
    interface TweetaProps {
        tweeta: TweetaType,
    }
}

export {
    TweetaType,
    TweetaProps,
}