import axios from "axios";

type GetInclinePhraseGenitiveResponse = {
	orig: string;
	gent: string;
};

// TODO: Так как данный сервис рабоатет на бесплатном аккаунте heroku, он обязан спать 6 часов в сутки. Перенести сервис локально.
export class GetInclinePhraseGenitiveClient {
	public async get(phrase: string): Promise<string> {
		const response = await axios.get<GetInclinePhraseGenitiveResponse>(
			`http://pyphrasy.herokuapp.com/inflect?phrase=${encodeURIComponent(
				phrase
			)}&forms=gent`
		);

		return response.data.gent;
	}
}
