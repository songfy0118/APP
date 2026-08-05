import SwiftUI
import WatchKit

struct WatchMood: Identifiable {
    let id = UUID()
    let mood: String
    let face: String
    let reply: String
    let prompt: String
    let haptic: WKHapticType
    let tint: Color
}

private let watchMoods = [
    WatchMood(
        mood: "紧张",
        face: "抱抱月",
        reply: "先把肩膀放低一点。现在不用马上处理全部。",
        prompt: "吸气 4 秒，呼气 6 秒",
        haptic: .start,
        tint: .orange
    ),
    WatchMood(
        mood: "困",
        face: "盖被月",
        reply: "困了可以撤退。今晚不用再证明什么。",
        prompt: "把屏幕放远一点",
        haptic: .directionDown,
        tint: .blue
    ),
    WatchMood(
        mood: "烦",
        face: "皱眉月",
        reply: "先别跟情绪吵架。把最吵的一句放下来。",
        prompt: "停 10 秒再决定",
        haptic: .retry,
        tint: .pink
    ),
    WatchMood(
        mood: "低落",
        face: "贴贴月",
        reply: "我在。你不用马上变好，先被接住一下。",
        prompt: "把手腕贴近一点",
        haptic: .success,
        tint: .purple
    )
]

struct MoonWatchCompanion: View {
    @State private var selected = watchMoods[0]
    @State private var bufferSeconds = 10
    @State private var isBuffering = false
    @State private var bufferProgress = 0.0

    private let bufferTimer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    var body: some View {
        ScrollView {
            VStack(spacing: 12) {
                moodOrb
                statusCopy
                bufferButton
                moodGrid
            }
            .padding(.vertical, 8)
            .padding(.horizontal, 4)
        }
        .onReceive(bufferTimer) { _ in
            tickBuffer()
        }
    }

    private var moodOrb: some View {
        ZStack {
            Circle()
                .stroke(selected.tint.opacity(0.24), lineWidth: 8)
                .frame(width: 86, height: 86)

            Circle()
                .trim(from: 0, to: bufferProgress)
                .stroke(selected.tint, style: StrokeStyle(lineWidth: 8, lineCap: .round))
                .rotationEffect(.degrees(-90))
                .frame(width: 86, height: 86)
                .animation(.easeInOut(duration: 0.2), value: bufferProgress)

            VStack(spacing: 4) {
                Text(selected.face)
                    .font(.headline)
                Text(isBuffering ? "\(bufferSeconds)s" : "10s")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
        }
        .accessibilityLabel("\(selected.mood)缓冲")
    }

    private var statusCopy: some View {
        VStack(spacing: 6) {
            Text(selected.mood)
                .font(.headline)

            Text(selected.reply)
                .font(.footnote)
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)

            Text(selected.prompt)
                .font(.caption2)
                .foregroundStyle(selected.tint)
        }
    }

    private var bufferButton: some View {
        Button(isBuffering ? "缓冲中" : "开始 10 秒缓冲") {
            startBuffer()
        }
        .buttonStyle(.borderedProminent)
        .tint(selected.tint)
        .disabled(isBuffering)
    }

    private var moodGrid: some View {
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 8) {
            ForEach(watchMoods) { item in
                Button(item.mood) {
                    selectMood(item)
                }
                .buttonStyle(.bordered)
                .tint(item.tint)
            }
        }
    }

    private func selectMood(_ item: WatchMood) {
        selected = item
        resetBuffer()
        WKInterfaceDevice.current().play(item.haptic)
    }

    private func startBuffer() {
        bufferSeconds = 10
        bufferProgress = 0
        isBuffering = true
        WKInterfaceDevice.current().play(selected.haptic)
    }

    private func tickBuffer() {
        guard isBuffering else { return }
        bufferSeconds -= 1
        bufferProgress = min(1, Double(10 - bufferSeconds) / 10)

        if bufferSeconds == 5 {
            WKInterfaceDevice.current().play(.click)
        }

        if bufferSeconds <= 0 {
            isBuffering = false
            bufferSeconds = 10
            bufferProgress = 1
            WKInterfaceDevice.current().play(.success)
        }
    }

    private func resetBuffer() {
        isBuffering = false
        bufferSeconds = 10
        bufferProgress = 0
    }
}

#Preview {
    MoonWatchCompanion()
}
