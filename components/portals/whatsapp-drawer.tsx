'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, Send, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Msg = { from: 'bot' | 'user'; text: string }

type Step = {
  bot: string
  replies: string[]
}

const script: Step[] = [
  {
    bot: 'नमस्ते Rahul! 🙏 This is the Skilling Outcome bot. Are you still employed at Tech Corp? / क्या आप अभी भी Tech Corp में कार्यरत हैं?',
    replies: ['Yes, still working', 'No, I left'],
  },
  {
    bot: 'Great! Which salary bracket are you in now? / अभी आपका वेतन किस श्रेणी में है?',
    replies: ['₹25k–40k', '₹40k–60k', '₹60k+'],
  },
  {
    bot: 'Thank you! Have you been promoted since joining? / क्या आपको पदोन्नति मिली है?',
    replies: ['Yes, promoted', 'Not yet'],
  },
  {
    bot: 'Verified and recorded. Your 12-month retention status is now confirmed via WhatsApp. धन्यवाद! ✅',
    replies: [],
  },
]

export function WhatsAppDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState<Msg[]>([{ from: 'bot', text: script[0].bot }])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function reply(text: string) {
    const next = step + 1
    setMessages((m) => [...m, { from: 'user', text }])
    if (script[next]) {
      setTimeout(() => {
        setMessages((m) => [...m, { from: 'bot', text: script[next].bot }])
        setStep(next)
      }, 550)
    } else {
      setStep(next)
    }
  }

  function restart() {
    setStep(0)
    setMessages([{ from: 'bot', text: script[0].bot }])
  }

  const current = script[step]

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-label="WhatsApp AI check-in bot"
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-border bg-card shadow-xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-border bg-success/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-success text-success-foreground">
              <Bot className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">Skilling Outcome Bot</p>
              <p className="text-[11px] text-success">online · WhatsApp AI</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto bg-muted/40 p-4"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm',
                  m.from === 'user'
                    ? 'rounded-br-sm bg-success text-success-foreground'
                    : 'rounded-bl-sm bg-card text-foreground',
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3">
          {current && current.replies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {current.replies.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => reply(r)}
                  className="rounded-full border border-success/40 bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/20"
                >
                  {r}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <Badge variant="success">
                <Send className="size-3" /> Retention confirmed via bot
              </Badge>
              <button
                type="button"
                onClick={restart}
                className="text-xs font-medium text-primary hover:underline"
              >
                Replay conversation
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
