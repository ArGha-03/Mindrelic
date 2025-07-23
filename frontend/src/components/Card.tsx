import { ShareIcon } from "../icons/ShareIcon";

interface CardProp {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

function getYoutubeEmbedUrl(url: string): string {
  const patterns = [
    /(?:youtu\.be\/)([\w-]{11})/,  // youtu.be/<id>
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,  // youtube.com/watch?v=<id>
    /(?:youtube\.com\/embed\/)([\w-]{11})/,   // youtube.com/embed/<id>
    /(?:youtube\.com\/live\/)([\w-]{11})/,      // youtube.com/live/<id>
    /(?:youtube\.com\/shorts\/)([\w-]{11})/   // youtube.com/shorts/<id>
  ];
  let id = '';
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      id = match[1];
      break;
    }
  }
  return id ? `https://www.youtube.com/embed/${id}` : '';
}


export const Card = ({ title, link, type }: CardProp) => (
  <div className="border border-gray-200 rounded-lg p-4 bg-white w-72 min-h-56 h-full shadow-sm hover:shadow-lg hover:bg-gray-50 transition-shadow duration-200">
    <div className="flex items-center justify-between mb-2">
      <div className="text-lg font-semibold text-gray-700">{title}</div>
      <div className="flex items-center space-x-2">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
          className="p-1 rounded hover:bg-blue-100"
        >
          <ShareIcon size="md" />
        </a>
      </div>
    </div>
    <div className="pt-2.5">
      {type === "youtube" && (
        <iframe
          className="w-full aspect-video rounded"
          src={getYoutubeEmbedUrl(link)}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}

      {type === "twitter" && (
        <blockquote className="twitter-tweet">
          <a href={link.replace("x.com", "twitter.com")}></a>
        </blockquote>
      )}
    </div>
  </div>
);
