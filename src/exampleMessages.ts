import type { Chat } from "./domain/entities/Chat.ts";

export const exampleChats: Chat[] = [
  {
    id: "chat-1",
    title: "Introduction to the Platform",
    createdAt: new Date("2024-12-20T10:00:00Z"),
    updatedAt: new Date("2024-12-20T10:05:00Z"),
    messages: [
      {
        id: "msg-001",
        object: "chat.completion",
        created: 1678001000,
        model: "gpt-4o-mini",
        system_fingerprint: "fp_sys_abc123",
        choices: [
          {
            index: 0,
            message: {
              role: "system",
              content:
                "Welcome to our platform! I'm here to provide system-level instructions."
            },
            logprobs: null,
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: 5,
          completion_tokens: 8,
          total_tokens: 13,
          completion_tokens_details: {
            reasoning_tokens: 0,
            accepted_prediction_tokens: 0,
            rejected_prediction_tokens: 0
          }
        }
      },
      {
        id: "msg-002",
        object: "chat.completion",
        created: 1678001050,
        model: "gpt-4o-mini",
        system_fingerprint: "fp_assistant_01",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content:
                "Hello, user! I can help guide you through the features of our platform."
            },
            logprobs: null,
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: 6,
          completion_tokens: 7,
          total_tokens: 13,
          completion_tokens_details: {
            reasoning_tokens: 0,
            accepted_prediction_tokens: 0,
            rejected_prediction_tokens: 0
          }
        }
      },
      {
        id: "msg-003",
        object: "chat.completion",
        created: 1678001100,
        model: "gpt-4o-mini",
        system_fingerprint: "fp_user_001",
        choices: [
          {
            index: 0,
            message: {
              role: "user",
              content: "Thanks! Could you walk me through the basics?"
            },
            logprobs: null,
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: 7,
          completion_tokens: 5,
          total_tokens: 12,
          completion_tokens_details: {
            reasoning_tokens: 0,
            accepted_prediction_tokens: 0,
            rejected_prediction_tokens: 0
          }
        }
      }
    ]
  },
  {
    id: "chat-2",
    title: "Flight Booking Inquiry",
    createdAt: new Date("2024-12-21T09:30:00Z"),
    updatedAt: new Date("2024-12-21T09:45:00Z"),
    messages: [
      {
        id: "msg-004",
        object: "chat.completion",
        created: 1678110000,
        model: "gpt-4o-mini",
        system_fingerprint: "fp_sys_flight",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content:
                "Hello there, how can I assist you with booking a flight?"
            },
            logprobs: null,
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: 5,
          completion_tokens: 7,
          total_tokens: 12,
          completion_tokens_details: {
            reasoning_tokens: 0,
            accepted_prediction_tokens: 0,
            rejected_prediction_tokens: 0
          }
        }
      },
      {
        id: "msg-005",
        object: "chat.completion",
        created: 1678110050,
        model: "gpt-4o-mini",
        system_fingerprint: "fp_user_flight",
        choices: [
          {
            index: 0,
            message: {
              role: "user",
              content: "I'm looking to travel from NYC to London next month."
            },
            logprobs: null,
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: 6,
          completion_tokens: 8,
          total_tokens: 14,
          completion_tokens_details: {
            reasoning_tokens: 0,
            accepted_prediction_tokens: 0,
            rejected_prediction_tokens: 0
          }
        }
      },
      {
        id: "msg-006",
        object: "chat.completion",
        created: 1678110100,
        model: "gpt-4o-mini",
        system_fingerprint: "fp_assistant_flight",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content:
                "Certainly! Do you have preferred travel dates or a specific budget?"
            },
            logprobs: null,
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: 5,
          completion_tokens: 7,
          total_tokens: 12,
          completion_tokens_details: {
            reasoning_tokens: 0,
            accepted_prediction_tokens: 0,
            rejected_prediction_tokens: 0
          }
        }
      }
    ]
  },
  {
    id: "chat-3",
    title: "Coding Advice",
    createdAt: new Date("2024-12-22T11:00:00Z"),
    updatedAt: new Date("2024-12-22T11:15:00Z"),
    messages: [
      {
        id: "msg-007",
        object: "chat.completion",
        created: 1678200000,
        model: "gpt-4o-mini",
        system_fingerprint: "fp_user_code",
        choices: [
          {
            index: 0,
            message: {
              role: "user",
              content:
                "I'm struggling with TypeScript generics. Could you show me an example?"
            },
            logprobs: null,
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: 8,
          completion_tokens: 10,
          total_tokens: 18,
          completion_tokens_details: {
            reasoning_tokens: 0,
            accepted_prediction_tokens: 0,
            rejected_prediction_tokens: 0
          }
        }
      },
      {
        id: "msg-008",
        object: "chat.completion",
        created: 1678200050,
        model: "gpt-4o-mini",
        system_fingerprint: "fp_assistant_code",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: `Sure! Here's a simple example:
\`\`\`ts
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`
This function takes a generic type 'T' and returns the same type.`
            },
            logprobs: null,
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 14,
          total_tokens: 24,
          completion_tokens_details: {
            reasoning_tokens: 0,
            accepted_prediction_tokens: 0,
            rejected_prediction_tokens: 0
          }
        }
      }
    ]
  }
];
