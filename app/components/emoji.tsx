import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";
import Image from "next/image";

import { ModelType } from "../store";

import BotIconDefault from "../icons/llm-icons/default.svg";
import BotIconOpenAI from "../icons/llm-icons/openai.svg";
import BotIconGemini from "../icons/llm-icons/gemini.svg";
import BotIconGemma from "../icons/llm-icons/gemma.svg";
import BotIconClaude from "../icons/llm-icons/claude.svg";
import BotIconMeta from "../icons/llm-icons/meta.svg";
import BotIconMistral from "../icons/llm-icons/mistral.svg";
import BotIconDeepseek from "../icons/llm-icons/deepseek.svg";
import BotIconMoonshot from "../icons/llm-icons/moonshot.svg";
import BotIconQwen from "../icons/llm-icons/qwen.svg";
import BotIconWenxin from "../icons/llm-icons/wenxin.svg";
import BotIconGrok from "../icons/llm-icons/grok.svg";
import BotIconHunyuan from "../icons/llm-icons/hunyuan.svg";
import BotIconDoubao from "../icons/llm-icons/doubao.svg";
import BotIconChatglm from "../icons/llm-icons/chatglm.svg";

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  // Whoever owns this Content Delivery Network (CDN), I am using your CDN to serve emojis
  // Old CDN broken, so I had to switch to this one
  // Author: https://github.com/H0llyW00dzZ
  return `https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/${style}/64/${unified}.png`;
}

export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  let link = "";

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    link = e.target.value;
  };

  const handleComplete = () => {
    // 点击完成按钮时，通过 onEmojiClick 返回输入框中的链接
    props.onEmojiClick(link);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* 输入框 */}
        <input
          type="text"
          onChange={handleLinkChange}
          placeholder="输入链接"
          style={{ flexGrow: 1 }}
        />

        {/* 完成按钮 */}
        <button
          style={{
            padding: "8px 32px",
            borderRadius: "8px",
            backgroundColor: "#0088cc",
            color: "#fff",
            marginLeft: "8px",
            border: "node",
          }}
          onClick={handleComplete}
        >
          完成
        </button>
      </div>
      {/* Emoji 选择器 */}
      <EmojiPicker
        width={"100%"}
        lazyLoadEmojis
        theme={EmojiTheme.AUTO}
        getEmojiUrl={getEmojiUrl}
        onEmojiClick={(e) => {
          props.onEmojiClick(e.unified); // 保持原有的表情选择功能
        }}
      />
    </div>
  );
}

export function Avatar(props: { model?: ModelType; avatar?: string }) {
  let LlmIcon = BotIconDefault;

  if (props.model) {
    const modelName = props.model.toLowerCase();

    if (
      modelName.startsWith("gpt") ||
      modelName.startsWith("chatgpt") ||
      modelName.startsWith("dall-e") ||
      modelName.startsWith("dalle") ||
      modelName.startsWith("o1") ||
      modelName.startsWith("o3")
    ) {
      LlmIcon = BotIconOpenAI;
    } else if (modelName.startsWith("gemini")) {
      LlmIcon = BotIconGemini;
    } else if (modelName.startsWith("gemma")) {
      LlmIcon = BotIconGemma;
    } else if (modelName.startsWith("claude")) {
      LlmIcon = BotIconClaude;
    } else if (modelName.includes("llama")) {
      LlmIcon = BotIconMeta;
    } else if (modelName.startsWith("mixtral") || modelName.startsWith("codestral")) {
      LlmIcon = BotIconMistral;
    } else if (modelName.includes("deepseek")) {
      LlmIcon = BotIconDeepseek;
    } else if (modelName.startsWith("moonshot")) {
      LlmIcon = BotIconMoonshot;
    } else if (modelName.startsWith("qwen")) {
      LlmIcon = BotIconQwen;
    } else if (modelName.startsWith("ernie")) {
      LlmIcon = BotIconWenxin;
    } else if (modelName.startsWith("grok")) {
      LlmIcon = BotIconGrok;
    } else if (modelName.startsWith("hunyuan")) {
      LlmIcon = BotIconHunyuan;
    } else if (modelName.startsWith("doubao") || modelName.startsWith("ep-")) {
      LlmIcon = BotIconDoubao;
    } else if (
      modelName.includes("glm") ||
      modelName.startsWith("cogview-") ||
      modelName.startsWith("cogvideox-")
    ) {
      LlmIcon = BotIconChatglm;
    }

    return (
      <div className="no-dark">
        <LlmIcon className="user-avatar" width={30} height={30} />
      </div>
    );
  }
  const avatar = props.avatar as any;
  if (avatar.startsWith("https://")) {
    return (
      <div className="user-avatar">
        <Image
          src={avatar}
          height={30}
          width={30}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          alt="avatar"
        />
      </div>
    );
  }

  return (
    <div className="user-avatar">
      {props.avatar && <EmojiAvatar avatar={props.avatar} />}
    </div>
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 18}
      getEmojiUrl={getEmojiUrl}
    />
  );
}
