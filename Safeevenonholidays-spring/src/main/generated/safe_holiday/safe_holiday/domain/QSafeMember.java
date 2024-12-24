package safe_holiday.safe_holiday.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSafeMember is a Querydsl query type for SafeMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSafeMember extends EntityPathBase<SafeMember> {

    private static final long serialVersionUID = -675551471L;

    public static final QSafeMember safeMember = new QSafeMember("safeMember");

    public final ListPath<Answer, QAnswer> answerList = this.<Answer, QAnswer>createList("answerList", Answer.class, QAnswer.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final ListPath<Favorite, QFavorite> favoriteList = this.<Favorite, QFavorite>createList("favoriteList", Favorite.class, QFavorite.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<Info, QInfo> InfoList = this.<Info, QInfo>createList("InfoList", Info.class, QInfo.class, PathInits.DIRECT2);

    public final ListPath<MemberRole, EnumPath<MemberRole>> memberRoleList = this.<MemberRole, EnumPath<MemberRole>>createList("memberRoleList", MemberRole.class, EnumPath.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final StringPath nickName = createString("nickName");

    public final StringPath password = createString("password");

    public final ListPath<Question, QQuestion> questionList = this.<Question, QQuestion>createList("questionList", Question.class, QQuestion.class, PathInits.DIRECT2);

    public final ListPath<Review, QReview> reviewList = this.<Review, QReview>createList("reviewList", Review.class, QReview.class, PathInits.DIRECT2);

    public final BooleanPath social = createBoolean("social");

    public QSafeMember(String variable) {
        super(SafeMember.class, forVariable(variable));
    }

    public QSafeMember(Path<? extends SafeMember> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSafeMember(PathMetadata metadata) {
        super(SafeMember.class, metadata);
    }

}

