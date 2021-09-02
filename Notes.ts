// tweets = await Tweeta.aggregate([
// 	{
// 		$lookup: {
// 			from: 'users',
// 			localField: 'postedBy',
// 			foreignField: '_id',
// 			as: 'users',
// 		},
// 	},
// 	{
// 		$unwind: {
// 			path: '$users',
// 			preserveNullAndEmptyArrays: true,
// 		},
// 	},
// 	{
// 		$lookup: {
// 			from: 'tweetas',
// 			localField: '_id',
// 			foreignField: '_id',
// 			as: 'tweets',
// 		},
// 	},
// 	{
// 		$unwind: {
// 			path: '$tweets',
// 			preserveNullAndEmptyArrays: true,
// 		},
// 	},
// 	{
// 		$lookup: {
// 			from: 'users',
// 			let: {
// 				postedBy: '$tweets.postedBy',
// 			},
// 			as: 'tweets.postedBy',
// 			pipeline: [
// 				{
// 					$match: {
// 						$expr: {
// 							$eq: ['$_id', '$$postedBy'],
// 						},
// 					},
// 				},
// 				{
// 					$project: {
// 						_id: '$_id',
// 						name: 1,
// 						username: 1,
// 						profilePic: 1,
// 					},
// 				},
// 			],
// 		},
// 	},
// 	{
// 		$unwind: {
// 			path: '$tweets.postedBy',
// 			preserveNullAndEmptyArrays: true,
// 		},
// 	},
// 	{
// 		$lookup: {
// 			from: 'tweetas',
// 			localField: 'replyTo',
// 			foreignField: '_id',
// 			as: 'tweets.replyTo',
// 		},
// 	},
// 	{
// 		$unwind: {
// 			path: '$tweets.replyTo',
// 			preserveNullAndEmptyArrays: true,
// 		},
// 	},
// 	{
// 		$lookup: {
// 			from: 'users',
// 			let: {
// 				postedBy: '$tweets.replyTo.postedBy',
// 			},
// 			as: 'tweets.replyTo.postedBy',
// 			pipeline: [
// 				{
// 					$match: {
// 						$expr: {
// 							$eq: ['$_id', '$$postedBy'],
// 						},
// 					},
// 				},
// 				{
// 					$project: {
// 						_id: '$_id',
// 						name: 1,
// 						username: 1,
// 						profilePic: 1,
// 					},
// 				},
// 			],
// 		},
// 	},
// 	{
// 		$unwind: {
// 			path: '$tweets.replyTo.postedBy',
// 			preserveNullAndEmptyArrays: true,
// 		},
// 	},
// 	{
// 		$lookup: {
// 			from: 'tweetas',
// 			localField: 'retweetData',
// 			foreignField: '_id',
// 			as: 'tweets.retweetData',
// 		},
// 	},
// 	{
// 		$unwind: {
// 			path: '$tweets.retweetData',
// 			preserveNullAndEmptyArrays: true,
// 		},
// 	},
// 	{
// 		$lookup: {
// 			from: 'users',
// 			let: {
// 				postedBy: '$tweets.retweetData.postedBy',
// 			},
// 			as: 'tweets.retweetData.postedBy',
// 			pipeline: [
// 				{
// 					$match: {
// 						$expr: {
// 							$eq: ['$_id', '$$postedBy'],
// 						},
// 					},
// 				},
// 				{
// 					$project: {
// 						_id: '$_id',
// 						name: 1,
// 						username: 1,
// 						profilePic: 1,
// 					},
// 				},
// 			],
// 		},
// 	},
// 	{
// 		$unwind: {
// 			path: '$tweets.retweetData.postedBy',
// 			preserveNullAndEmptyArrays: true,
// 		},
// 	},
// 	{
// 		$match: {
// 			$or: [
// 				{
// 					'users.username': {
// 						$regex: new RegExp(searchTerm, 'i'),
// 					},
// 				},
// 				{
// 					'users.name': {
// 						$regex: new RegExp(searchTerm, 'i'),
// 					},
// 				},
// 				{
// 					'tweets.content': {
// 						$regex: new RegExp(searchTerm, 'i'),
// 					},
// 				},
// 			],
// 		},
// 	},
// 	{
// 		$group: {
// 			_id: 0,
// 			tweets: {
// 				$push: '$tweets',
// 			},
// 		},
// 	},
// ]);
