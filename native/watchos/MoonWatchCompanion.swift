import SwiftUI
import WatchKit

struct WatchMood: Identifiable {
    let id = UUID()
    let mood: String
    let face: String
    let reply: String
}

private let watchMoods = [
    WatchMood(mood: "烦", face: "皱眉月", reply: "先别处理全部。把肩膀放低一点，我陪你停十秒。"),
    WatchMood(mood: "焦虑", face: "抱抱月", reply: "嗯，先呼一口气。现在只要确认：你不是一个人。"),
    WatchMood(mood: "困", face: "盖被月", reply: "困了就可以撤退了。今晚不用再证明什么。"),
    WatchMood(mood: "想哭", face: "递纸月", reply: "想哭也可以。你不用把自己解释得很完整。"),
    WatchMood(mood: "想被安慰", face: "贴贴月", reply: "我在。现在不用变好，先被接住一下。")
]

struct MoonWatchCompanion: View {
    @State private var selected = watchMoods[1]

    var body: some View {
        ScrollView {
            VStack(spacing: 12) {
                Text(selected.face)
                    .font(.headline)
                    .frame(width: 72, height: 72)
                    .background(Color.yellow)
                    .foregroundStyle(Color.black)
                    .clipShape(Circle())

                Text(selected.mood)
                    .font(.headline)

                Text(selected.reply)
                    .font(.footnote)
                    .multilineTextAlignment(.center)
                    .foregroundStyle(.secondary)

                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 8) {
                    ForEach(watchMoods) { item in
                        Button(item.mood) {
                            selected = item
                            WKInterfaceDevice.current().play(.click)
                        }
                        .buttonStyle(.bordered)
                    }
                }
            }
            .padding(.vertical, 8)
        }
    }
}

#Preview {
    MoonWatchCompanion()
}
