package com.everstarbackmain.global.openai.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Content {

	private String type;
	private String text;
	private ImageUrl image_url;

	private Content(String type, String text, ImageUrl imageUrl) {
		this.type = type;
		this.text = text;
		this.image_url = imageUrl;
	}

	public static Content createTextContent(String text) {
		return new Content("text", text, null);
	}

	public static Content createImageContent(String imageUrl) {
		return new Content("image_url", null, new ImageUrl(imageUrl));
	}

	private static class ImageUrl {
		private String url;

		public ImageUrl(String url) {
			this.url = url;
		}

		public String getUrl() {
			return url;
		}
	}

}
